import { Card, Table, Badge, Row, Col, ListGroup } from 'react-bootstrap';
import { formatCurrency, formatDate, getOrderStatusVariant, getOrderStatusText } from '../../utils/helpers';

const OrderDetailCard = ({ order }) => {
  if (!order) return null;

  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const shipping = 15000;
  const tax = subtotal * 0.11;

  return (
    <>
      {/* Order Information */}
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Order Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0">
                  <strong>Order ID:</strong> #{order.order_id}
                </ListGroup.Item>
                <ListGroup.Item className="px-0">
                  <strong>Order Date:</strong> {formatDate(order.created_at)}
                </ListGroup.Item>
                <ListGroup.Item className="px-0">
                  <strong>Status:</strong>{' '}
                  <Badge bg={getOrderStatusVariant(order.status)}>
                    {getOrderStatusText(order.status)}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0">
                  <strong>Shipping Address:</strong>
                  <div className="mt-2 text-muted">{order.shipping_address}</div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Order Items */}
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Order Items</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Product</th>
                <th className="text-center">Quantity</th>
                <th className="text-end">Price</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr key={item.order_item_id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image_url || 'https://via.placeholder.com/60'}
                        alt={item.name}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '12px'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60?text=No+Image';
                        }}
                      />
                      <div>
                        <div className="fw-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">{item.quantity}</td>
                  <td className="text-end align-middle">{formatCurrency(item.price)}</td>
                  <td className="text-end align-middle fw-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Order Summary */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Order Summary</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>Subtotal</span>
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
              <strong className="text-primary fs-5">{formatCurrency(order.total_amount)}</strong>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderDetailCard;