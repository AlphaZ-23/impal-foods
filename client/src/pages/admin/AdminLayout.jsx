import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Products', path: '/admin/products' },
  { name: 'Site Content', path: '/admin/content' },
];

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-ink text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-display font-semibold">
            Impal <span className="text-brand-accent">Foods</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Administration Panel</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="block w-full text-center bg-brand-accent hover:bg-brand-accent-dark text-white rounded-xl px-4 py-3 font-medium transition-all duration-200"
          >
            🏠 View Website
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-grow flex flex-col">
        <header className="bg-white border-b border-brand-border px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-brand-ink">
              Impal Foods Administration
            </h1>
            <p className="text-sm text-brand-ink-light">
              Manage products and website content
            </p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="bg-brand-accent hover:bg-brand-accent-dark text-white px-5 py-2 rounded-xl font-medium transition-all duration-200"
          >
            View Website
          </Link>
        </header>

        <main className="flex-grow p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
