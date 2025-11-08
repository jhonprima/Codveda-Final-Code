import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaBox, FaSignOutAlt, FaUserCog, FaHome, FaStore, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemCount } = useCart();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setExpanded(false);
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="navbar-shadow py-3"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
      variant="dark"
      expanded={expanded}
      sticky="top"
    >
      <Container>
        {/* Brand Logo */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          onClick={() => setExpanded(false)}
          className="fw-bold fs-4"
          style={{ letterSpacing: '1px' }}
        >
          <span className="me-2" style={{ fontSize: '1.5rem' }}>🛍️</span>
          <span className="d-none d-sm-inline">MiniMart</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Left Side Menu */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              onClick={() => setExpanded(false)}
              className="px-3 fw-semibold"
            >
              <FaHome className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/products" 
              onClick={() => setExpanded(false)}
              className="px-3 fw-semibold"
            >
              <FaStore className="me-2" />
              Products
            </Nav.Link>
            {isAdmin() && (
              <Nav.Link 
                as={Link} 
                to="/admin" 
                onClick={() => setExpanded(false)}
                className="px-3 fw-semibold"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  margin: '0 8px'
                }}
              >
                <FaTachometerAlt className="me-2" />
                Admin Panel
              </Nav.Link>
            )}
          </Nav>

          {/* Right Side Menu */}
          <Nav className="align-items-center">
            {isAuthenticated() ? (
              <>
                {/* Shopping Cart */}
                <Nav.Link 
                  as={Link} 
                  to="/cart" 
                  className="position-relative px-3 mx-2" 
                  onClick={() => setExpanded(false)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaShoppingCart size={20} />
                  {getCartItemCount() > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute"
                      style={{
                        top: '0',
                        right: '5px',
                        fontSize: '0.7rem',
                        padding: '0.35em 0.5em',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Nav.Link>

                {/* User Dropdown */}
                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      <div 
                        className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ 
                          width: '35px', 
                          height: '35px',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="fw-semibold d-none d-lg-inline">{user?.username}</span>
                    </span>
                  } 
                  id="user-dropdown"
                  align="end"
                  className="ms-2"
                >
                  <NavDropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>
                    <FaUser className="me-2 text-primary" /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders" onClick={() => setExpanded(false)}>
                    <FaBox className="me-2 text-success" /> My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  onClick={() => setExpanded(false)}
                  className="px-3 fw-semibold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    margin: '0 4px'
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register" 
                  onClick={() => setExpanded(false)}
                  className="px-3 fw-semibold"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#667eea',
                    borderRadius: '8px',
                    margin: '0 4px'
                  }}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;