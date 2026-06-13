import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    sugar: 0,
    poha: 0,
    featured: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/products');

        setStats({
          total: data.length,
          sugar: data.filter((p) => p.category === 'Sugar').length,
          poha: data.filter((p) => p.category === 'Poha').length,
          featured: data.filter((p) => p.featured).length,
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: 'Total Products',
      value: stats.total,
      color: 'bg-brand-accent',
      icon: '📦',
    },
    {
      label: 'Sugar Items',
      value: stats.sugar,
      color: 'bg-brand-accent-dark',
      icon: '🍬',
    },
    {
      label: 'Poha Items',
      value: stats.poha,
      color: 'bg-brand-ink',
      icon: '🌾',
    },
    {
      label: 'Featured Products',
      value: stats.featured,
      color: 'bg-brand-sand',
      icon: '⭐',
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-display font-semibold text-brand-ink mb-2">
          Dashboard
        </h1>

        <p className="text-brand-ink-light">
          Welcome back. Manage products and website content from one place.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${card.color}`}
            >
              {card.icon}
            </div>

            <h3 className="text-3xl font-bold text-brand-ink">
              {loading ? '...' : card.value}
            </h3>

            <p className="text-brand-ink-light mt-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-xl font-display font-semibold text-brand-ink mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-accent-light flex items-center justify-center text-xl">
                📦
              </div>

              <div>
                <h3 className="font-semibold text-brand-ink text-lg mb-1">
                  Manage Products
                </h3>

                <p className="text-brand-ink-light">
                  Add, edit, remove products and manage featured items.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/content"
            className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-accent-light flex items-center justify-center text-xl">
                📝
              </div>

              <div>
                <h3 className="font-semibold text-brand-ink text-lg mb-1">
                  Edit Website Content
                </h3>

                <p className="text-brand-ink-light">
                  Update About Us, company details, certifications and contact information.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-brand-ink mb-4">
          Website Overview
        </h2>

        <p className="text-brand-ink-light leading-relaxed">
          Use the dashboard to maintain product listings, update company
          information and manage featured products displayed on the homepage.
          Keeping product information up to date helps visitors discover your
          offerings quickly and improves the overall browsing experience.
        </p>

        <div className="mt-6">
          <Link to="/" target="_blank" className="btn-primary">
            View Public Website
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
