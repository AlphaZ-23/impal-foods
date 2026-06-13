import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
import heroImage from '../assets/hero.jpg';

const Home = () => {
  const [content, setContent] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, productsRes] = await Promise.all([
          api.get('/content'),
          api.get('/products', { params: { featured: true } }),
        ]);
        setContent(contentRes.data);
        setFeaturedProducts(productsRes.data);
      } catch (error) {
        console.error('Error loading home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout content={content}>
{/* Hero Section */}
<section
  className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
  {/* Admin Login Button */}
<div className="absolute top-6 right-6 z-20">
  <Link
    to="/admin/login"
    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full hover:bg-white hover:text-brand-ink transition-all duration-300 text-sm font-medium"
  >
    Admin Login
  </Link>
</div>
  style={{
    backgroundImage: `url(${heroImage})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-brand-ink/65"></div>

  {/* Content */}
  <div className="relative container-custom text-center text-white z-10">
    <div className="max-w-4xl mx-auto">

      <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm uppercase tracking-wider mb-6">
      Quality Food Products
      </span>

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
      Purity. Hygiene. <span className="text-brand-accent">Consistent Quality.</span>
      </h1>

      <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
      Trusted supplier of food products with a focus on purity, hygiene and consistent quality.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <Link to="/products" className="btn-primary">
          Explore Products
        </Link>

        <Link
          to="/contact"
          className="border border-white/40 text-white px-8 py-3 rounded-full hover:bg-white hover:text-brand-ink transition-all duration-300"
        >
          Contact Us
        </Link>
      </div>

    </div>
  </div>
</section>

{/* About Preview */}
<section className="py-16 bg-white">
  <div className="container-custom">
    <div className="max-w-4xl mx-auto text-center">

      <h2 className="section-title">
        About Impal Foods
      </h2>

      <p className="text-brand-ink-light leading-relaxed text-lg">
        Impal Foods is a wholesale supplier committed to delivering quality food
        products with a focus on purity, hygiene and reliability. We work closely
        with trusted sources and maintain strict quality standards to ensure
        consistency across our product range.
      </p>

      <Link
        to="/about"
        className="inline-block mt-8 text-brand-accent-dark font-medium hover:underline"
      >
        Learn More About Us →
      </Link>

    </div>
  </div>
</section>
{/* Why Choose Us */}
<section className="py-16 bg-brand-sand">
  <div className="container-custom">

    <div className="text-center mb-12">
      <h2 className="section-title">
        Why Choose Us
      </h2>
      <p className="section-subtitle">
        Committed to quality at every step.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="card p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
          Purity
        </h3>
        <p className="text-brand-ink-light">
          Carefully sourced products that meet quality expectations.
        </p>
      </div>

      <div className="card p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
          Hygiene
        </h3>
        <p className="text-brand-ink-light">
          Processed and handled with a focus on cleanliness and safety.
        </p>
      </div>

      <div className="card p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
          Reliability
        </h3>
        <p className="text-brand-ink-light">
          Consistent supply and dependable service for our customers.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle mx-auto">
          Explore a selection of quality food products available for wholesale supply.
          </p>

          {loading ? (
            <p className="text-brand-ink-light">Loading products...</p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-brand-ink-light">No featured products available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-brand-ink">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            Have a question or product inquiry?
          </h2>

          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Get in touch with us for product information, availability, or wholesale requirements.
          </p>

          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
