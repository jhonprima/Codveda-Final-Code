import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import orderService from '../services/orderService';
import { formatCurrency } from '../utils/helpers';
import { toast } from 'react-toastify';
import Loading from '../components/common/Loading';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading, fetchCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!cart.items || cart.items.length === 0) {
      navigate('/cart');
      return;
    }

    fetchCart();
  }, []);

  const calculateTotal = () => {
    const subtotal = parseFloat(cart.total) || 0;
    const shipping = 15000;
    const tax = subtotal * 0.11;
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error('Please enter shipping address');
      return;
    }

    setLoading(true);

    try {
      const result = await orderService.createOrder(shippingAddress);
      
      if (result.success) {
        toast.success('Order placed successfully!');
        navigate(`/orders/${result.data.order_id}`);
      } else {
        toast.error(result.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return <Loading fullScreen />;
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Checkout</h1>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            {/* Shipping Address */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaMapMarkerAlt className="me-2" />
                  Shipping Address
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Full Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your complete shipping address (Street, City, Province, Postal Code)"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Please provide complete address for accurate delivery
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Order Items */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaShoppingBag className="me-2" />
                  Order Items ({cart.itemCount})
                </h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {cart.items?.map((item) => (
                    <ListGroup.Item key={item.cart_id} className="px-0">
                      <Row className="align-items-center">
                        <Col xs={2}>
                          <img 
                            src={item.image_url || 'https://via.placeholder.com/80'}
                            alt={item.name}
                            style={{ 
                              width: '100%', 
                              height: 'auto', 
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                            }}
                          />
                        </Col>
                        <Col xs={6}>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">
                            {formatCurrency(item.price)} x {item.quantity}
                          </small>
                        </Col>
                        <Col xs={4} className="text-end">
                          <strong>{formatCurrency(item.subtotal)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div style={{ position: 'sticky', top: '20px' }}>
              {/* Order Summary */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Subtotal ({cart.itemCount} items)</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Shipping</span>
                      <span>{formatCurrency(shipping)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Tax (11%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0 border-top pt-3">
                      <strong>Total</strong>
                      <strong className="text-primary fs-5">{formatCurrency(total)}</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* Place Order Button */}
              <Button 
                variant="primary" 
                type="submit"
                className="w-100"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>

              <Button 
                variant="outline-secondary" 
                className="w-100 mt-2"
                onClick={() => navigate('/cart')}
                disabled={loading}
              >
                Back to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;