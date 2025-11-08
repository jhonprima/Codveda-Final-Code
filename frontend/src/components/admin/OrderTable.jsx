import { Table, Badge, Button, Form } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { formatCurrency, formatDateShort, getOrderStatusVariant, getOrderStatusText } from '../../utils/helpers';
import { ORDER_STATUS } from '../../utils/constants';

const OrderTable = ({ orders, onViewDetails, onStatusChange }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>#{order.order_id}</td>
              <td>{order.username}</td>
              <td>{order.email}</td>
              <td className="text-center">{order.item_count}</td>
              <td>{formatCurrency(order.total_amount)}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={order.status}
                  onChange={(e) => onStatusChange(order.order_id, e.target.value)}
                  className={`bg-${getOrderStatusVariant(order.status)} text-white border-0`}
                >
                  {Object.values(ORDER_STATUS).map((status) => (
                    <option key={status} value={status}>
                      {getOrderStatusText(status)}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>{formatDateShort(order.created_at)}</td>
              <td>
                <Button 
                  variant="outline-info" 
                  size="sm"
                  onClick={() => onViewDetails(order)}
                >
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderTable;