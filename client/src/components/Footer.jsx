import { Link } from 'react-router-dom';

const Footer = ({ content }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <div className="container-custom py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-semibold mb-2">
            Impal <span className="text-brand-accent">Foods</span>
          </h3>
          <p className="text-sm text-white/60">{content?.tagline || 'PURITY • TRUST • QUALITY'}</p>
          <p className="text-sm text-white/60 mt-3">
            FSSAI Verified · Est. {content?.establishedYear || '2026'}
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-brand-accent transition-colors">Products</Link></li>
            <li><Link to="/certifications" className="hover:text-brand-accent transition-colors">Certifications</Link></li>
            <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Contact Info</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{content?.address || '44/4, Pardeshipura, Indore (M.P.) – 452003'}</li>
            <li>{content?.phone || '+91 99934 08621'}</li>
            <li>{content?.email || 'impalfoodscontact@gmail.com'}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/50">
        © {year} Impal Foods. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
