import { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      toast.warning(`Only ${item.stock} items available in stock`);
      return;
    }

    setLoading(true);
    setQuantity(newQuantity);
    
    const result = await updateCartItem(item.cart_id, newQuantity);
    if (!result.success) {
      toast.error(result.message);
      setQuantity(item.quantity); // Revert on error
    }
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    const result = await removeFromCart(item.cart_id);
    if (result.success) {
      toast.success('Item removed from cart');
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={2} className="mb-3 mb-md-0">
            <img 
              src={item.image_url || 'https://via.placeholder.com/150'}
              alt={item.name}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
          </Col>

          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h6 className="mb-1">{item.name}</h6>
            <p className="text-muted small mb-0">{formatCurrency(item.price)} / item</p>
            <small className="text-muted">Stock: {item.stock}</small>
          </Col>

          <Col xs={6} md={3} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={loading || quantity <= 1}
              >
                <FaMinus />
              </Button>
              
              <Form.Control 
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) handleQuantityChange(val);
                }}
                className="mx-2 text-center"
                style={{ width: '60px' }}
                min="1"
                max={item.stock}
                disabled={loading}
              />
              
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={loading || quantity >= item.stock}
              >
                <FaPlus />
              </Button>
            </div>
          </Col>

          <Col xs={4} md={2} className="mb-3 mb-md-0">
            <h6 className="text-primary mb-0 text-center">
              {formatCurrency(item.subtotal)}
            </h6>
          </Col>

          <Col xs={2} md={1} className="text-center">
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={handleRemove}
              disabled={loading}
            >
              <FaTrash />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;