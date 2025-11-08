import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from '../components/product/ProductList';
import ProductFilter from '../components/product/ProductFilter';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import productService from '../services/productService';
import { debounce } from '../utils/helpers';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: '', max: '' },
    sortBy: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      if (filters.category) {
        response = await productService.getProductsByCategory(filters.category, {
          page: currentPage,
          limit: 12,
        });
      } else {
        response = await productService.getAllProducts({
          page: currentPage,
          limit: 12,
          search: searchTerm,
        });
      }

      let productsData = response.data;

      // Apply price filter
      if (filters.priceRange.min || filters.priceRange.max) {
        productsData = productsData.filter((product) => {
          const price = parseFloat(product.price);
          const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
          const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
          return price >= min && price <= max;
        });
      }

      // Apply sorting
      if (filters.sortBy) {
        productsData = [...productsData].sort((a, b) => {
          switch (filters.sortBy) {
            case 'price_asc':
              return parseFloat(a.price) - parseFloat(b.price);
            case 'price_desc':
              return parseFloat(b.price) - parseFloat(a.price);
            case 'name_asc':
              return a.name.localeCompare(b.name);
            case 'name_desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });
      }

      setProducts(productsData);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 500);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: '', max: '' },
      sortBy: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Products</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} placeholder="Search products..." />
      </div>

      <Row>
        {/* Sidebar Filter */}
        <Col lg={3} className="mb-4">
          <ProductFilter 
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </Col>

        {/* Products List */}
        <Col lg={9}>
          <ProductList products={products} loading={loading} />
          
          {/* Pagination */}
          {!loading && products.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;