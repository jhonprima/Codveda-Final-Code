import { useState, useEffect } from 'react';
import { Container, Card, Form, InputGroup, Badge, Modal, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import orderService from '../../services/orderService';
import OrderTable from '../../components/admin/OrderTable';
import OrderDetailCard from '../../components/order/OrderDetailCard';
import Loading from '../../components/common/Loading';
import { getOrderStatusVariant } from '../../utils/helpers';
import { toast } from 'react-toastify';

const OrderManagement = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await orderService.getOrderById(order.order_id);
      setSelectedOrder(response.data);
      setShowDetailModal(true);
    } catch (error) {
      toast.error('Failed to fetch order details');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id.toString().includes(searchTerm) ||
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1>Order Management</h1>
        <p className="text-muted mb-0">Manage and track all customer orders</p>
      </div>

      {/* Statistics */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        <Badge 
          bg="secondary" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('all')}
        >
          All Orders: {stats.total}
        </Badge>
        <Badge 
          bg="warning" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('pending')}
        >
          Pending: {stats.pending}
        </Badge>
        <Badge 
          bg="info" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('processing')}
        >
          Processing: {stats.processing}
        </Badge>
        <Badge 
          bg="primary" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('shipped')}
        >
          Shipped: {stats.shipped}
        </Badge>
        <Badge 
          bg="success" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('delivered')}
        >
          Delivered: {stats.delivered}
        </Badge>
        <Badge 
          bg="danger" 
          className="p-2"
          style={{ cursor: 'pointer' }}
          onClick={() => setStatusFilter('cancelled')}
        >
          Cancelled: {stats.cancelled}
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card className="mb-4">
        <Card.Body>
          <div className="row g-3">
            <div className="col-md-8">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by Order ID, Customer Name, or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-4">
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            {statusFilter === 'all' ? 'All Orders' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Orders`} 
            {' '}({filteredOrders.length})
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No orders found</p>
            </div>
          ) : (
            <OrderTable
              orders={filteredOrders}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
            />
          )}
        </Card.Body>
      </Card>

      {/* Order Detail Modal */}
      <Modal 
        show={showDetailModal} 
        onHide={() => setShowDetailModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && <OrderDetailCard order={selectedOrder} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement;