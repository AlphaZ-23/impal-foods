import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, sugar: 0, poha: 0, featured: 0 });
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
    { label: 'Total Products', value: stats.total, color: 'bg-brand-green' },
    { label: 'Sugar Items', value: stats.sugar, color: 'bg-brand-gold' },
    { label: 'Poha Items', value: stats.poha, color: 'bg-brand-green-dark' },
    { label: 'Featured', value: stats.featured, color: 'bg-gray-700' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-brand-green-dark mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, manage your website content here.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className={`w-10 h-10 rounded-lg ${card.color} mb-3`}></div>
            <p className="text-2xl font-bold text-gray-800">{loading ? '...' : card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/products" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-brand-green-dark mb-1">Manage Products</h3>
          <p className="text-sm text-gray-500">Add, edit, or remove Sugar and Poha products.</p>
        </Link>
        <Link to="/admin/content" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-brand-green-dark mb-1">Edit Site Content</h3>
          <p className="text-sm text-gray-500">Update About Us, contact info, certifications, and more.</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
