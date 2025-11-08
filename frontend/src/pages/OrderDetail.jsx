import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Breadcrumb } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import orderService from '../services/orderService';
import OrderDetailCard from '../components/order/OrderDetailCard';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Order not found');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderService.cancelOrder(id);
        toast.success('Order cancelled successfully');
        fetchOrderDetail();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!order) {
    return null;
  }

  const canCancel = order.status === 'pending' || order.status === 'processing';

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/orders')}>Orders</Breadcrumb.Item>
        <Breadcrumb.Item active>Order #{order.order_id}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/orders')}
            className="mb-2"
          >
            <FaArrowLeft className="me-2" /> Back to Orders
          </Button>
          <h1>Order Details</h1>
        </div>
        
        {canCancel && (
          <Button 
            variant="danger"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>
        )}
      </div>

      {/* Order Details */}
      <OrderDetailCard order={order} />
    </Container>
  );
};

export default OrderDetail;