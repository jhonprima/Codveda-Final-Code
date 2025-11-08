import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDateShort, getOrderStatusVariant, getOrderStatusText } from '../../utils/helpers';
import { FaEye } from 'react-icons/fa';

const OrderItem = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${order.order_id}`);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={3} className="mb-2 mb-md-0">
            <div>
              <small className="text-muted">Order ID</small>
              <h6 className="mb-0">#{order.order_id}</h6>
            </div>
          </Col>

          <Col xs={6} md={2} className="mb-2 mb-md-0">
            <div>
              <small className="text-muted">Date</small>
              <div className="small">{formatDateShort(order.created_at)}</div>
            </div>
          </Col>

          <Col xs={6} md={2} className="mb-2 mb-md-0">
            <div>
              <small className="text-muted">Items</small>
              <div className="small">{order.item_count} items</div>
            </div>
          </Col>

          <Col xs={6} md={2} className="mb-2 mb-md-0">
            <div>
              <small className="text-muted">Total</small>
              <div className="fw-bold text-primary">{formatCurrency(order.total_amount)}</div>
            </div>
          </Col>

          <Col xs={6} md={2} className="mb-2 mb-md-0">
            <Badge bg={getOrderStatusVariant(order.status)} className="w-100">
              {getOrderStatusText(order.status)}
            </Badge>
          </Col>

          <Col xs={12} md={1} className="text-end">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleViewDetails}
            >
              <FaEye />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderItem;