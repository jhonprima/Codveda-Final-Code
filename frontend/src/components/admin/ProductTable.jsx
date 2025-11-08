import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { formatCurrency, formatDateShort } from '../../utils/helpers';

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>
                <img 
                  src={product.image_url || 'https://via.placeholder.com/50'}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                  }}
                />
              </td>
              <td>{product.name}</td>
              <td>
                <Badge bg="secondary">{product.category_name || 'N/A'}</Badge>
              </td>
              <td>{formatCurrency(product.price)}</td>
              <td>
                <Badge bg={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                  {product.stock}
                </Badge>
              </td>
              <td>{formatDateShort(product.created_at)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-info" 
                    size="sm"
                    onClick={() => onView(product)}
                  >
                    <FaEye />
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => onEdit(product)}
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => onDelete(product)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;