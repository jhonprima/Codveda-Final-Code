import { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, fetchCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const result = await clearCart();
      if (result.success) {
        toast.success('Cart cleared successfully');
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <Container className="py-5">
        <EmptyState
          icon={<FaShoppingCart />}
          title="Your cart is empty"
          message="Start shopping and add items to your cart!"
          action={
            <Button variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Shopping Cart</h1>
        <Button 
          variant="outline-danger" 
          onClick={handleClearCart}
        >
          <FaTrash className="me-2" /> Clear Cart
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Cart Items ({cart.itemCount})</h5>
            </Card.Header>
            <Card.Body>
              {cart.items.map((item) => (
                <CartItem key={item.cart_id} item={item} />
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <CartSummary cart={cart} onCheckout={handleCheckout} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;