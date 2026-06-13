import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';

const placeholderImg =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgNjAwIDQ1MCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNGMEU4REMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzJFMkEyNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMyIj5JbXBhbCBGb29kczwvdGV4dD48L3N2Zz4=';

const ProductDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contentRes, productRes] = await Promise.all([
          api.get('/content'),
          api.get(`/products/${id}`),
        ]);
        setContent(contentRes.data);
        setProduct(productRes.data);
        setActiveImage(0);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Layout content={content}>
        <div className="container-custom py-20 text-center text-brand-ink-light">Loading...</div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout content={content}>
        <div className="container-custom py-20 text-center">
          <p className="text-brand-ink-light mb-4">{error || 'Product not found.'}</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [placeholderImg];

  return (
    <Layout content={content}>
      <section className="py-12">
        <div className="container-custom">
          <Link to="/products" className="text-brand-accent-dark hover:underline text-sm">
            &larr; Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            {/* Image Gallery */}
            <div>
              <div className="h-80 md:h-96 rounded-3xl overflow-hidden bg-brand-sand mb-4">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 ${
                        activeImage === idx ? 'border-brand-accent' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="tag mb-3">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-brand-ink mb-4 mt-2">
                {product.name}
              </h1>
              <p className="text-brand-ink-light leading-relaxed mb-6">{product.description}</p>

              <div className="bg-brand-sand rounded-2xl p-5 mb-6">
                <h3 className="font-semibold text-brand-ink mb-1">Ingredients</h3>
                <p className="text-brand-ink-light">{product.ingredients}</p>
              </div>

              <Link to="/contact" className="btn-primary inline-block">
                Contact for Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
