import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import productService from '../../services/productService';
import orderService from '../../services/orderService';
import { formatCurrency } from '../../utils/helpers';
import Loading from '../../components/common/Loading';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsResponse = await productService.getAllProducts({ limit: 1000 });
      
      // Fetch orders
      const ordersResponse = await orderService.getAllOrders();
      const orders = ordersResponse.data;

      // Calculate stats
      const totalRevenue = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

      const pendingOrders = orders.filter(order => order.status === 'pending').length;

      setStats({
        totalProducts: productsResponse.data.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FaBox,
      color: 'primary',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: 'success',
      link: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: FaDollarSign,
      color: 'warning',
      link: '/admin/orders',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: FaUsers,
      color: 'danger',
      link: '/admin/orders',
    },
  ];

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1>Admin Dashboard</h1>
        <p className="text-muted">Welcome back! Here's what's happening with your store.</p>
      </div>

      <Row>
        {statCards.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card 
              className="h-100 border-0 shadow-sm"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(stat.link)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1 small">{stat.title}</p>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <div>
                    <stat.icon size={40} className={`text-${stat.color}`} />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/admin/products')}
                >
                  <FaBox className="me-2" /> Manage Products
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/admin/orders')}
                >
                  <FaShoppingCart className="me-2" /> View Orders
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                <strong>{stats.pendingOrders}</strong> orders are waiting for processing
              </p>
              <p className="text-muted">
                <strong>{stats.totalProducts}</strong> products in inventory
              </p>
              <p className="text-muted mb-0">
                Total revenue: <strong>{formatCurrency(stats.totalRevenue)}</strong>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;