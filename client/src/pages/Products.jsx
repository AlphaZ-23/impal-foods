import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
const categories = ['All', 'Sugar', 'Poha'];

const Products = () => {
  const [content, setContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get('/content');
        setContent(data);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = activeCategory !== 'All' ? { category: activeCategory } : {};
        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  return (
    <Layout content={content}>
      <section className="page-header">
        <div className="container-custom text-center">
          <h1 className="section-title">Our Products</h1>
          <p className="section-subtitle mx-auto">
          Browse our selection of quality food products available for wholesale supply.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">

          <div className="text-center max-w-3xl mx-auto mb-10 pb-8 border-b border-brand-border">
            <p className="text-brand-ink-light leading-relaxed">
              We offer carefully sourced food products with a focus on quality,
              hygiene, and consistency. Explore our product categories below
              and contact us for wholesale inquiries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'bg-white text-brand-ink-light border border-brand-border hover:border-brand-accent hover:text-brand-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <p className="text-center text-brand-ink-light">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-brand-ink-light">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
