
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-cream/90 border-b border-brand-border">
      <div className="container-custom flex items-center justify-between py-4">

       <Link to="/" className="flex items-center gap-3">
  <img
    src={logo}
    alt="Impal Foods Logo"
    className="h-12 w-auto object-contain"
  />

  <div>
    <h1 className="font-display text-xl font-semibold text-brand-ink leading-none">
      Impal <span className="text-brand-accent">Foods</span>
    </h1>

    <p className="text-xs text-brand-ink-light tracking-wider">
      PURITY • TRUST • QUALITY
    </p>
  </div>
</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'relative text-brand-accent font-semibold after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-brand-accent after:rounded-full'
                  : 'text-brand-ink-light font-medium hover:text-brand-ink transition-colors'
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="bg-brand-accent text-white px-5 py-2.5 rounded-full shadow-sm hover:bg-brand-accent-dark hover:shadow-md transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-brand-ink"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-brand-cream border-t border-brand-border px-5 py-5 flex flex-col gap-5 shadow-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-brand-accent font-semibold'
                  : 'text-brand-ink-light font-medium'
              }
            >
              {link.name}
            </NavLink>
          ))}

      
        </nav>
      )}
    </header>
  );
};

export default Navbar;
