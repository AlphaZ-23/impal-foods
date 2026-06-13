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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

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
      const { data } = await api.put(
        `/products/${productId}/remove-image`,
        { imagePath }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? data : p))
      );
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
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setMessage('Product updated successfully.');
      } else {
        await api.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setMessage('Product added successfully.');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error saving product.'
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full border border-brand-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent';

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-brand-ink">
            Manage Products
          </h1>

          <p className="text-brand-ink-light mt-2">
            Add, edit and manage your food products.
          </p>
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
        <div className="bg-brand-accent-light text-brand-accent-dark border border-brand-border rounded-2xl px-4 py-3 mb-6">
          {message}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-sm mb-8 space-y-6"
        >
          <h2 className="text-2xl font-display font-semibold text-brand-ink">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-brand-ink">
                Product Name
              </label>

              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-brand-ink">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className={inputClass}
              >
                <option value="Sugar">Sugar</option>
                <option value="Poha">Poha</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-brand-ink">
              Description
            </label>

            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-brand-ink">
              Ingredients
            </label>

            <input
              type="text"
              required
              value={form.ingredients}
              onChange={(e) =>
                setForm({
                  ...form,
                  ingredients: e.target.value,
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-brand-ink">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) =>
                setFiles(Array.from(e.target.files))
              }
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              id="featured"
              onChange={(e) =>
                setForm({
                  ...form,
                  featured: e.target.checked,
                })
              }
            />

            <label
              htmlFor="featured"
              className="text-sm font-medium text-brand-ink"
            >
              Show on Home Page
            </label>
          </div>

          {editingId &&
            products.find((p) => p._id === editingId)?.images
              ?.length > 0 && (
              <div>
                <h3 className="font-medium text-brand-ink mb-3">
                  Current Images
                </h3>

                <div className="flex flex-wrap gap-4">
                  {products
                    .find((p) => p._id === editingId)
                    .images.map((img) => (
                      <div
                        key={img}
                        className="relative"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-24 h-24 rounded-xl object-cover border border-brand-border"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveImage(editingId, img)
                          }
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving
              ? 'Saving...'
              : editingId
              ? 'Update Product'
              : 'Add Product'}
          </button>
        </form>
      )}

      <div className="bg-brand-surface border border-brand-border rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-8 text-brand-ink-light">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="p-8 text-brand-ink-light">
            No products available.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-brand-accent-light text-brand-ink">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Featured</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-brand-border"
                >
                  <td className="p-4">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-brand-sand"></div>
                    )}
                  </td>

                  <td className="p-4 font-medium text-brand-ink">
                    {product.name}
                  </td>

                  <td className="p-4 text-brand-ink-light">
                    {product.category}
                  </td>

                  <td className="p-4">
                    {product.featured ? (
                      <span className="tag">Featured</span>
                    ) : (
                      <span className="text-brand-ink-light text-sm">
                        No
                      </span>
                    )}
                  </td>

                  <td className="p-4 space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-brand-accent hover:text-brand-accent-dark font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
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
