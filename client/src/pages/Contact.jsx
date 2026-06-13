
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

const Contact = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get('/content');
        setContent(data);
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <Layout content={content}>
      {/* Header */}
      <section className="page-header">
        <div className="container-custom text-center">
          <h1 className="section-title">Contact Us</h1>

          <p className="section-subtitle mx-auto">
            Get in touch with us for product information, wholesale inquiries,
            and business partnerships.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div>

            <h2 className="font-display text-3xl font-semibold text-brand-ink mb-4">
              Get In Touch
            </h2>

            <p className="text-brand-ink-light mb-8 leading-relaxed">
              We are happy to assist with product inquiries, availability,
              wholesale requirements, and general business information.
            </p>

            <div className="space-y-5">

              <div className="card p-8">
                <h3 className="font-semibold text-brand-ink mb-2">
                  Address
                </h3>

                <p className="text-brand-ink-light">
                  {content?.address ||
                    '44/4, Pardeshipura, Indore (M.P.) – 452003'}
                </p>
              </div>

              <div className="card p-8">
                <h3 className="font-semibold text-brand-ink mb-2">
                  Phone
                </h3>

                <a
                  href={`tel:${content?.phone || '+919993408621'}`}
                  className="text-brand-ink-light hover:text-brand-accent-dark"
                >
                  {content?.phone || '+91 99934 08621'}
                </a>
              </div>

              <div className="card p-8">
                <h3 className="font-semibold text-brand-ink mb-2">
                  Email
                </h3>

                <a
                  href={`mailto:${content?.email || 'impalfoodscontact@gmail.com'}`}
                  className="text-brand-ink-light hover:text-brand-accent-dark"
                >
                  {content?.email || 'impalfoodscontact@gmail.com'}
                </a>
              </div>

              <div className="card p-8">
                <h3 className="font-semibold text-brand-ink mb-2">
                  Certification
                </h3>

                <p className="text-brand-ink-light">
                  FSSAI Certified Food Business
                </p>
              </div>

            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden shadow-sm border border-brand-border min-h-[450px]">

            <iframe
              title="Impal Foods Location"
              src={
                content?.mapEmbedUrl ||
                'https://www.google.com/maps?q=44/4,+Pardeshipura,+Indore,+Madhya+Pradesh+452003&output=embed'
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-brand-ink">
        <div className="container-custom text-center">

          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            Looking for Wholesale Supply?
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto">
            Contact us to learn more about our products, availability,
            and supply options.
          </p>

        </div>
      </section>
    </Layout>
  );
};

export default Contact;
