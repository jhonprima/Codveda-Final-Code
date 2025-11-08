import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaPhone,
  FaTwitter,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="mt-auto"
      style={{
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        color: '#fff'
      }}
    >
      {/* Main Footer Content */}
      <div className="py-5">
        <Container>
          <Row className="g-4">
            {/* About Section */}
            <Col lg={4} md={6}>
              <div className="mb-3">
                <h5 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                  🛍️ MiniMart
                </h5>
                <p className="text-light opacity-75" style={{ lineHeight: '1.8' }}>
                  Your trusted online marketplace for quality products at affordable prices. 
                  We bring you the best shopping experience with fast delivery and excellent customer service.
                </p>
                <div className="d-flex gap-3 mt-3">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light"
                    style={{ 
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#1877f2'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}
                  >
                    <FaFacebook />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light"
                    style={{ 
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#e4405f'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}
                  >
                    <FaInstagram />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light"
                    style={{ 
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#1da1f2'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-light"
                    style={{ 
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#0077b5'}
                    onMouseLeave={(e) => e.target.style.color = '#fff'}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </Col>
            
            {/* Quick Links */}
            <Col lg={2} md={6}>
              <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
                Quick Links
              </h6>
              <ul className="list-unstyled">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Products' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact' }
                ].map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link 
                      to={link.to}
                      className="text-light text-decoration-none opacity-75"
                      style={{ 
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.paddingLeft = '8px';
                        e.target.style.color = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '0.75';
                        e.target.style.paddingLeft = '0';
                        e.target.style.color = '#fff';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Customer Service */}
            <Col lg={3} md={6}>
              <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
                Customer Service
              </h6>
              <ul className="list-unstyled">
                {[
                  { to: '/faq', label: 'FAQ' },
                  { to: '/shipping', label: 'Shipping Info' },
                  { to: '/returns', label: 'Returns' },
                  { to: '/terms', label: 'Terms of Service' },
                  { to: '/privacy', label: 'Privacy Policy' }
                ].map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link 
                      to={link.to}
                      className="text-light text-decoration-none opacity-75"
                      style={{ 
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.paddingLeft = '8px';
                        e.target.style.color = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '0.75';
                        e.target.style.paddingLeft = '0';
                        e.target.style.color = '#fff';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            
            {/* Contact Info */}
            <Col lg={3} md={6}>
              <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
                Contact Us
              </h6>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <FaMapMarkerAlt className="mt-1 me-2 flex-shrink-0" style={{ color: '#667eea' }} />
                  <span className="text-light opacity-75" style={{ fontSize: '0.9rem' }}>
                    Jl. Teknologi No. 123<br />
                    Jakarta Selatan, 12345<br />
                    Indonesia
                  </span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaPhone className="me-2 flex-shrink-0" style={{ color: '#667eea' }} />
                  <a 
                    href="tel:+628123456789"
                    className="text-light text-decoration-none opacity-75"
                    style={{ fontSize: '0.9rem' }}
                  >
                    +62 812-3456-7890
                  </a>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="me-2 flex-shrink-0" style={{ color: '#667eea' }} />
                  <a 
                    href="mailto:support@minimart.com"
                    className="text-light text-decoration-none opacity-75"
                    style={{ fontSize: '0.9rem' }}
                  >
                    support@minimart.com
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Bottom Bar */}
      <div 
        className="py-3"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0 text-light opacity-75" style={{ fontSize: '0.9rem' }}>
                © {currentYear} MiniMart. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0 text-light opacity-75" style={{ fontSize: '0.9rem' }}>
                Made with <FaHeart className="text-danger mx-1" /> for 
                <a 
                  href="https://codveda.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-decoration-none ms-1"
                  style={{ 
                    color: '#667eea',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#764ba2'}
                  onMouseLeave={(e) => e.target.style.color = '#667eea'}
                >
                  Codveda Internship
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;