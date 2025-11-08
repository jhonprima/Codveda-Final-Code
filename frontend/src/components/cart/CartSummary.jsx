import { Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const CartSummary = ({ cart, onCheckout }) => {
  const navigate = useNavigate();
  const subtotal = parseFloat(cart.total) || 0;
  const shipping = subtotal > 0 ? 15000 : 0; // Flat shipping rate
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + shipping + tax;

  return (
    <Card>
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
            <strong className="text-primary">{formatCurrency(total)}</strong>
          </ListGroup.Item>
        </ListGroup>

        <Button 
          variant="primary" 
          className="w-100 mt-3"
          size="lg"
          onClick={onCheckout}
          disabled={!cart.items || cart.items.length === 0}
        >
          Proceed to Checkout
        </Button>

        <Button 
          variant="outline-secondary" 
          className="w-100 mt-2"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;