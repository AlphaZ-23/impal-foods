import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminLayout from './AdminLayout';

const AdminContent = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get('/content');
        setForm(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage('');

    try {
      const { data } = await api.put('/content', form);

      setForm(data);
      setMessage('Content updated successfully.');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Error updating content.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <AdminLayout>
        <div className="bg-brand-surface border border-brand-border rounded-3xl p-8">
          <p className="text-brand-ink-light">
            Loading content...
          </p>
        </div>
      </AdminLayout>
    );
  }

  const inputClass =
    'w-full border border-brand-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent';

  const sections = [
    {
      title: 'Company Information',
      fields: [
        {
          label: 'Company Name',
          key: 'companyName',
          type: 'text',
        },
        {
          label: 'Tagline',
          key: 'tagline',
          type: 'text',
        },
        {
          label: 'Established Year',
          key: 'establishedYear',
          type: 'text',
        },
        {
          label: 'Business Type',
          key: 'businessType',
          type: 'text',
        },
      ],
    },
    {
      title: 'Home Page',
      fields: [
        {
          label: 'Home Introduction',
          key: 'homeIntro',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'About Us',
      fields: [
        {
          label: 'Our Story',
          key: 'aboutStory',
          type: 'textarea',
        },
        {
          label: 'Mission',
          key: 'mission',
          type: 'textarea',
        },
        {
          label: 'Vision',
          key: 'vision',
          type: 'textarea',
        },
        {
          label: 'Manufacturing Process',
          key: 'manufacturingProcess',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'Certifications',
      fields: [
        {
          label: 'Certification Information',
          key: 'certificationInfo',
          type: 'textarea',
        },
        {
          label: 'FSSAI Verified',
          key: 'fssaiVerified',
          type: 'checkbox',
        },
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        {
          label: 'Address',
          key: 'address',
          type: 'text',
        },
        {
          label: 'Phone',
          key: 'phone',
          type: 'text',
        },
        {
          label: 'Email',
          key: 'email',
          type: 'text',
        },
        {
          label: 'Google Maps Embed URL',
          key: 'mapEmbedUrl',
          type: 'text',
        },
      ],
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-brand-ink mb-2">
          Site Content
        </h1>

        <p className="text-brand-ink-light">
          Manage company information, certifications,
          homepage content and contact details.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 bg-brand-accent-light text-brand-accent-dark border border-brand-border rounded-2xl px-4 py-3">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-display font-semibold text-brand-ink">
                {section.title}
              </h2>

              <div className="w-16 h-1 bg-brand-accent rounded-full mt-3"></div>
            </div>

            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.key}>
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={field.key}
                        checked={!!form[field.key]}
                        onChange={(e) =>
                          handleChange(
                            field.key,
                            e.target.checked
                          )
                        }
                        className="w-5 h-5 accent-brand-accent"
                      />

                      <label
                        htmlFor={field.key}
                        className="font-medium text-brand-ink"
                      >
                        {field.label}
                      </label>
                    </div>
                  ) : field.type === 'textarea' ? (
                    <>
                      <label className="block text-sm font-medium text-brand-ink mb-2">
                        {field.label}
                      </label>

                      <textarea
                        rows={5}
                        value={form[field.key] || ''}
                        onChange={(e) =>
                          handleChange(
                            field.key,
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-brand-ink mb-2">
                        {field.label}
                      </label>

                      <input
                        type="text"
                        value={form[field.key] || ''}
                        onChange={(e) =>
                          handleChange(
                            field.key,
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving
              ? 'Saving Changes...'
              : 'Save Changes'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminContent;
