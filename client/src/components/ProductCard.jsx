import { Link } from 'react-router-dom';

const placeholderImg =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGMEU4REMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzJFMkEyNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5JbXBhbCBGb29kczwvdGV4dD48L3N2Zz4=';

const ProductCard = ({ product }) => {
  const image = product.images && product.images.length > 0 ? product.images[0] : placeholderImg;

  return (
    <Link to={`/products/${product._id}`} className="card group block">
      <div className="h-64 overflow-hidden bg-brand-sand">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <span className="tag mb-3">
          {product.category}
        </span>
        <h3 className="font-display text-xl font-semibold text-brand-ink mb-2 mt-2">{product.name}</h3>
        <p className="text-brand-ink-light text-sm leading-relaxed line-clamp-3">{product.description}</p>
        <span className="inline-block mt-3 text-brand-accent-dark font-medium text-sm">
          Learn More &rarr;
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
