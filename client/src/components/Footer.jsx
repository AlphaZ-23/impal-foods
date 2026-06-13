import { Link } from 'react-router-dom';
import swachhBharat from '../assets/swachh-bharat.png';
import keepClean from '../assets/keep-clean.png';
import makeInIndia from '../assets/make-in-india.png';

const Footer = ({ content }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <div className="container-custom py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-display text-xl font-semibold mb-2">
            Impal <span className="text-brand-accent">Foods</span>
          </h3>

          <p className="text-sm text-white/60">
            {content?.tagline || 'PURITY • TRUST • QUALITY'}
          </p>

          <p className="text-sm text-white/60 mt-3">
            FSSAI Verified · Est. {content?.establishedYear || '2026'}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-3">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link
                to="/"
                className="hover:text-brand-accent transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-brand-accent transition-colors"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hover:text-brand-accent transition-colors"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/certifications"
                className="hover:text-brand-accent transition-colors"
              >
                Certifications
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-brand-accent transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-display font-semibold mb-3">
            Contact Info
          </h4>

          <ul className="space-y-2 text-sm text-white/70">
            <li>
              {content?.address ||
                '44/4, Pardeshipura, Indore (M.P.) – 452003'}
            </li>

            <li>
              {content?.phone || '+91 99934 08621'}
            </li>

            <li>
              {content?.email ||
                'impalfoodscontact@gmail.com'}
            </li>
          </ul>
        </div>
      </div>

      {/* Badges */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom flex flex-wrap items-center justify-center gap-8">
          <img
            src={swachhBharat}
            alt="Swachh Bharat"
            className="h-12 w-auto object-contain bg-white rounded-md p-1.5"
          />
          <img
            src={keepClean}
            alt="Keep India Clean"
            className="h-12 w-auto object-contain bg-white rounded-md p-1.5"
          />
          <img
            src={makeInIndia}
            alt="Make in India"
            className="h-12 w-auto object-contain bg-white rounded-md p-1.5"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-white/50">
            © {year} Impal Foods. All rights reserved.
          </p>

          <Link
            to="/admin/login"
            className="text-[11px] text-white/40 hover:text-brand-accent transition-all duration-300"
            title="Admin Login"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
