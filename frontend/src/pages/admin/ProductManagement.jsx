import { useState, useEffect } from 'react';
import { Container, Button, Card, InputGroup, Form } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import productService from '../../services/productService';
import ProductTable from '../../components/admin/ProductTable';
import ProductFormModal from '../../components/admin/ProductFormModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts({ limit: 1000 });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowFormModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowFormModal(true);
  };

  const handleView = (product) => {
    navigate(`/products/${product.product_id}`);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await productService.deleteProduct(selectedProduct.product_id);
      toast.success('Product deleted successfully');
      fetchProducts();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleFormSuccess = () => {
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Product Management</h1>
          <p className="text-muted mb-0">Manage your product inventory</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-4">
        <Card.Body>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Products Table */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">All Products ({filteredProducts.length})</h5>
        </Card.Header>
        <Card.Body className="p-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No products found</p>
            </div>
          ) : (
            <ProductTable
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </Card.Body>
      </Card>

      {/* Product Form Modal */}
      <ProductFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        product={selectedProduct}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default ProductManagement;