import { Alert as BootstrapAlert } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ variant = 'info', message, onClose, dismissible = true }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <FaCheckCircle className="me-2" />;
      case 'danger':
        return <FaTimesCircle className="me-2" />;
      case 'warning':
        return <FaExclamationCircle className="me-2" />;
      default:
        return <FaInfoCircle className="me-2" />;
    }
  };

  return (
    <BootstrapAlert variant={variant} onClose={onClose} dismissible={dismissible} className="d-flex align-items-center">
      {getIcon()}
      <div>{message}</div>
    </BootstrapAlert>
  );
};

export default Alert;