import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Breadcrumb, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import productService from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/helpers';
import Loading from '../components/common/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('Product ID from URL:', id); // Debug log
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching product with ID:', id); // Debug log
      
      const response = await productService.getProductById(id);
      
      console.log('Product response:', response); // Debug log
      
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error); // Debug log
      console.error('Error response:', error.response); // Debug log
      
      setError(error.response?.data?.message || 'Product not found');
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      toast.warning('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const result = await addToCart(product.product_id, quantity);
    if (result.success) {
      toast.success(`${quantity} item(s) added to cart!`);
      setQuantity(1);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>😕 {error || 'Product Not Found'}</h4>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            ← Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Back Button */}
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate('/products')}
      >
        <FaArrowLeft className="me-2" /> Back to Products
      </Button>

      <Row>
        {/* Product Image */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow">
            <Card.Img 
              variant="top" 
              src={product.image_url || `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(product.name)}`}
              style={{ 
                height: '500px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </Card>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <h1 className="mb-3">{product.name}</h1>

          <div className="mb-3">
            <Badge bg="secondary" className="me-2 px-3 py-2">
              {product.category_name || 'Uncategorized'}
            </Badge>
            {product.stock < 10 && product.stock > 0 && (
              <Badge bg="warning" text="dark" className="px-3 py-2">
                Only {product.stock} left!
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge bg="danger" className="px-3 py-2">
                Out of Stock
              </Badge>
            )}
          </div>

          <h2 className="text-primary mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            {formatCurrency(product.price)}
          </h2>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3 fw-bold">Description</h5>
              <p className="text-muted" style={{ lineHeight: '1.8' }}>
                {product.description || 'No description available.'}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={6} className="mb-3 mb-md-0">
                  <Form.Label className="fw-bold mb-2">Quantity</Form.Label>
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        borderRadius: '8px'
                      }}
                    >
                      <FaMinus />
                    </Button>
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= product.stock) {
                          setQuantity(val);
                        }
                      }}
                      className="mx-3 text-center fw-bold"
                      style={{ 
                        width: '80px',
                        height: '40px',
                        fontSize: '1.2rem',
                        borderRadius: '8px'
                      }}
                      min="1"
                      max={product.stock}
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        borderRadius: '8px'
                      }}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  <small className="text-muted mt-2 d-block">
                    Available: <strong>{product.stock}</strong> items
                  </small>
                </Col>

                <Col xs={12} md={6} className="text-md-end">
                  <div className="mb-2">
                    <small className="text-muted d-block">Subtotal</small>
                    <h3 className="text-primary mb-0 fw-bold">
                      {formatCurrency(product.price * quantity)}
                    </h3>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-100 py-3"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '12px',
              background: product.stock === 0 
                ? '#6c757d' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (product.stock > 0) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            <FaShoppingCart className="me-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;