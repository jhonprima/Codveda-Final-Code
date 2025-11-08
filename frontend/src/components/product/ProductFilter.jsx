import { useState, useEffect } from 'react';
import { Form, Card, Badge, Button } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import productService from '../../services/productService';

const ProductFilter = ({ onFilterChange, onClearFilters }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onFilterChange({ category: categoryId, priceRange, sortBy });
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({ category: selectedCategory, priceRange: newPriceRange, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ category: selectedCategory, priceRange, sortBy: value });
  };

  const handleClearAll = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    onClearFilters();
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span><FaFilter className="me-2" /> Filters</span>
        <Button variant="link" size="sm" onClick={handleClearAll}>
          <FaTimes /> Clear All
        </Button>
      </Card.Header>
      <Card.Body>
        {/* Categories */}
        <div className="mb-3">
          <Form.Label className="fw-bold">Categories</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            <Badge 
              bg={selectedCategory === '' ? 'primary' : 'light'}
              text={selectedCategory === '' ? 'white' : 'dark'}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCategoryChange('')}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category.category_id}
                bg={selectedCategory === category.category_id.toString() ? 'primary' : 'light'}
                text={selectedCategory === category.category_id.toString() ? 'white' : 'dark'}
                style={{ cursor: 'pointer' }}
                onClick={() => handleCategoryChange(category.category_id.toString())}
              >
                {category.name} ({category.product_count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-3">
          <Form.Label className="fw-bold">Price Range</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              size="sm"
            />
            <span className="align-self-center">-</span>
            <Form.Control
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              size="sm"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-2">
          <Form.Label className="fw-bold">Sort By</Form.Label>
          <Form.Select 
            size="sm"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductFilter;