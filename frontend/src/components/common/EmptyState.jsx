import { FaBoxOpen } from 'react-icons/fa';

const EmptyState = ({ 
  icon = <FaBoxOpen />, 
  title = 'No Data Found', 
  message = 'There are no items to display.',
  action = null 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="text-muted">{message}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
};

export default EmptyState;