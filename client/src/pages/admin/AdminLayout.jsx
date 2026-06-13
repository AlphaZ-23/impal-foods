import { NavLink, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-green-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">
            Impal <span className="text-brand-gold">Foods</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-green text-white' : 'text-gray-200 hover:bg-white/10'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
