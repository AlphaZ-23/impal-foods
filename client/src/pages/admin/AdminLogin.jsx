import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block"
          >
            <h1 className="font-display text-4xl font-semibold text-brand-ink">
              Impal{' '}
              <span className="text-brand-accent">
                Foods
              </span>
            </h1>
          </Link>

          <p className="text-brand-ink-light mt-3">
            Administration Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-brand-surface border border-brand-border rounded-3xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-accent-light rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🔐
            </div>

            <h2 className="font-display text-2xl font-semibold text-brand-ink">
              Welcome Back
            </h2>

            <p className="text-brand-ink-light mt-2">
              Sign in to manage products and website content
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-brand-ink mb-2">
                Username / Email
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                className="w-full border border-brand-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-ink mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full border border-brand-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading
                ? 'Signing In...'
                : 'Login to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-border text-center">
            <Link
              to="/"
              className="text-brand-accent hover:text-brand-accent-dark font-medium transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-brand-ink-light">
            Impal Foods Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
