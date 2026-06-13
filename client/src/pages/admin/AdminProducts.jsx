import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const emptyForm = {
  name: '',
  category: 'Sugar',
  description: '',
  ingredients: '',
  featured: false,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setFiles([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      ingredients: product.ingredients,
      featured: product.featured,
    });
    setEditingId(product._id);
    setFiles([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setMessage('Product deleted successfully.');
    } catch (error) {
      setMessage('Error deleting product.');
    }
  };

  const handleRemoveImage = async (productId, imagePath) => {
    try {
      const { data } = await api.put(`/products/${productId}/remove-image`, { imagePath });
      setProducts((prev) => prev.map((p) => (p._id === productId ? data : p)));
    } catch (error) {
      setMessage('Error removing image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('ingredients', form.ingredients);
      formData.append('featured', form.featured);
      files.forEach((file) => formData.append('images', file));

      if (editingId) {
        await api.put(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Product updated successfully.');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Product added successfully.');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error saving product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-green-dark">Manage Products</h1>
          <p className="text-gray-500">Add, edit, or remove Sugar and Poha products.</p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {message && (
        <div className="bg-brand-green-light text-brand-green-dark text-sm rounded-lg px-4 py-2 mb-4">
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-brand-green-dark text-lg">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="Sugar">Sugar</option>
                <option value="Poha">Poha</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            <input
              type="text"
              required
              value={form.ingredients}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images {editingId ? '(adds to existing images)' : ''}
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-brand-green-light file:text-brand-green-dark"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Show on Home Page (Featured)
            </label>
          </div>

          {/* Existing images when editing */}
          {editingId && products.find((p) => p._id === editingId)?.images?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
              <div className="flex gap-3 flex-wrap">
                {products
                  .find((p) => p._id === editingId)
                  .images.map((img) => (
                    <div key={img} className="relative w-20 h-20">
                      <img src={img} alt="product" className="w-full h-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(editingId, img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-gray-500">No products added yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-brand-green-light text-brand-green-dark text-left">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100">
                  <td className="p-4">
                    {product.images?.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                    ) : (
                      <div className="w-12 h-12 bg-brand-green-light rounded-lg"></div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4">
                    {product.featured ? (
                      <span className="text-xs bg-brand-green-light text-brand-green-dark px-2 py-1 rounded-full">Yes</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">No</span>
                    )}
                  </td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleEdit(product)} className="text-brand-green font-medium hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 font-medium hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
