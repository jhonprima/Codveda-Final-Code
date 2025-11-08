import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import productService from '../services/productService';
import Loading from '../components/common/Loading';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productService.getAllProducts({ limit: 8 });
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Carousel */}
      <Carousel className="mb-5">
        <Carousel.Item>
          <div 
            style={{ 
              height: '400px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Container>
              <Row className="align-items-center text-white">
                <Col md={6}>
                  <h1 className="display-4 fw-bold mb-3">Welcome to MiniMart</h1>
                  <p className="lead mb-4">Your one-stop shop for everything you need</p>
                  <Button 
                    variant="light" 
                    size="lg"
                    onClick={() => navigate('/products')}
                  >
                    Shop Now
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div 
            style={{ 
              height: '400px', 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Container>
              <Row className="align-items-center text-white">
                <Col md={6}>
                  <h1 className="display-4 fw-bold mb-3">Amazing Deals</h1>
                  <p className="lead mb-4">Get up to 50% off on selected items</p>
                  <Button 
                    variant="light" 
                    size="lg"
                    onClick={() => navigate('/products')}
                  >
                    Explore Deals
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div 
            style={{ 
              height: '400px', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Container>
              <Row className="align-items-center text-white">
                <Col md={6}>
                  <h1 className="display-4 fw-bold mb-3">Fast Delivery</h1>
                  <p className="lead mb-4">Get your orders delivered in 2-3 days</p>
                  <Button 
                    variant="light" 
                    size="lg"
                    onClick={() => navigate('/products')}
                  >
                    Order Now
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>

      <Container>
        {/* Features */}
        <Row className="mb-5">
          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaShoppingBag size={48} className="text-primary mb-3" />
                <h5>Wide Selection</h5>
                <p className="text-muted small">Thousands of products to choose from</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaTruck size={48} className="text-success mb-3" />
                <h5>Fast Shipping</h5>
                <p className="text-muted small">Quick and reliable delivery service</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaHeadset size={48} className="text-info mb-3" />
                <h5>24/7 Support</h5>
                <p className="text-muted small">We're here to help anytime</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body>
                <FaShieldAlt size={48} className="text-warning mb-3" />
                <h5>Secure Payment</h5>
                <p className="text-muted small">Your transactions are safe with us</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Featured Products */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Products</h2>
            <Button 
              variant="outline-primary"
              onClick={() => navigate('/products')}
            >
              View All
            </Button>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <ProductList products={featuredProducts} loading={loading} />
          )}
        </div>

        {/* CTA Section */}
        <Card className="mb-5 border-0 shadow" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Card.Body className="text-center text-white py-5">
            <h2 className="mb-3">Start Shopping Today!</h2>
            <p className="lead mb-4">Join thousands of happy customers</p>
            <Button 
              variant="light" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;