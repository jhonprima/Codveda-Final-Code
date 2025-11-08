import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';
import { FaBoxOpen } from 'react-icons/fa';

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <Row>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className="card" style={{ height: '400px' }}>
              <div className="placeholder-glow">
                <div className="placeholder col-12" style={{ height: '200px' }}></div>
                <div className="card-body">
                  <div className="placeholder col-8"></div>
                  <div className="placeholder col-12"></div>
                  <div className="placeholder col-6"></div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState 
        icon={<FaBoxOpen />}
        title="No Products Found"
        message="We couldn't find any products matching your search."
      />
    );
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.product_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;