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
<section
  className="relative overflow-hidden bg-brand-ink py-24"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-brand-ink/80"></div>

  <div className="relative container-custom z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

```
  {/* Left Content */}
  <div className="text-white">
    <span className="inline-block px-4 py-2 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-sm font-medium mb-6">
      ✨ Quality Food Products
    </span>

    <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6">
      Purity.
      <br />
      Hygiene.
      <br />
      <span className="text-brand-accent">
        Consistent Quality.
      </span>
    </h1>

    <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-8">
      Trusted supplier of premium Sugar and Poha products,
      delivering purity, hygiene and reliability for households,
      retailers and wholesale partners.
    </p>

    <div className="flex flex-wrap gap-4 mb-10">
      <Link to="/products" className="btn-primary">
        Explore Products
      </Link>

      <Link
        to="/contact"
        className="border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-brand-ink transition-all"
      >
        Contact Us
      </Link>
    </div>

    <div className="grid grid-cols-3 gap-6 max-w-lg">
      <div>
        <h3 className="text-3xl font-bold text-brand-accent">
          100%
        </h3>
        <p className="text-white/60 text-sm">
          Quality Checked
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-brand-accent">
          FSSAI
        </h3>
        <p className="text-white/60 text-sm">
          Verified
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-brand-accent">
          24/7
        </h3>
        <p className="text-white/60 text-sm">
          Support
        </p>
      </div>
    </div>
  </div>

  {/* Right Featured Product */}
  <div>
    {featuredProducts?.length > 0 && (
      <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md mx-auto">
        <span className="tag">
          Featured Product
        </span>

        <img
          src={featuredProducts[0]?.images?.[0]}
          alt={featuredProducts[0]?.name}
          className="w-full h-64 object-cover rounded-2xl mt-4"
        />

        <h3 className="font-display text-2xl font-semibold text-brand-ink mt-5">
          {featuredProducts[0]?.name}
        </h3>

        <p className="text-brand-ink-light mt-3 line-clamp-3">
          {featuredProducts[0]?.description}
        </p>

        <Link
          to="/products"
          className="btn-primary w-full text-center block mt-5"
        >
          View Product
        </Link>
      </div>
    )}
  </div>

</div>
```

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
