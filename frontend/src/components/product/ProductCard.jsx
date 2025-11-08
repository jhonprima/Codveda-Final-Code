import { Card, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      toast.warning('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const result = await addToCart(product.product_id, 1);
    if (result.success) {
      toast.success('Product added to cart!');
    } else {
      toast.error(result.message);
    }
  };

  const handleViewDetails = () => {
      console.log('View product:', product.product_id);
    navigate(`/products/${product.product_id}`);
  };

  return (
    <Card className="h-100 product-card">
      <div style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }} onClick={handleViewDetails}>
        <Card.Img 
          variant="top" 
          src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} 
          style={{ 
            height: '100%', 
            objectFit: 'cover',
            width: '100%'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">
            {product.category_name || 'Uncategorized'}
          </Badge>
          {product.stock < 10 && product.stock > 0 && (
            <Badge bg="warning" text="dark">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge bg="danger">
              Out of Stock
            </Badge>
          )}
        </div>

        <Card.Title 
          className="text-truncate" 
          style={{ cursor: 'pointer' }}
          onClick={handleViewDetails}
        >
          {product.name}
        </Card.Title>
        
        <Card.Text className="text-muted small" style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="text-primary mb-0">{formatCurrency(product.price)}</h5>
            <small className="text-muted">Stock: {product.stock}</small>
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="flex-grow-1"
              onClick={handleViewDetails}
            >
              <FaEye className="me-1" /> View
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-grow-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart className="me-1" /> Add
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;