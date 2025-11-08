import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBox } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import orderService from '../services/orderService';
import OrderItem from '../components/order/OrderItem';
import EmptyState from '../components/common/EmptyState';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5">
        <EmptyState
          icon={<FaBox />}
          title="No Orders Yet"
          message="You haven't placed any orders yet. Start shopping now!"
          action={
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Browse Products
            </button>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Orders</h1>

      <Card className="mb-3">
        <Card.Body>
          <p className="text-muted mb-0">
            Total Orders: <strong>{orders.length}</strong>
          </p>
        </Card.Body>
      </Card>

      {orders.map((order) => (
        <OrderItem key={order.order_id} order={order} />
      ))}
    </Container>
  );
};

export default Orders;