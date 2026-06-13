
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

const Certifications = () => {
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

  const qualityPoints = [
    {
      title: 'Hygienic Handling',
      desc: 'Products are handled following hygienic practices to maintain quality and food safety.',
    },
    {
      title: 'Quality Inspection',
      desc: 'Regular quality checks help ensure consistency and reliability across our product range.',
    },
    {
      title: 'Food-Grade Packaging',
      desc: 'Products are packed using appropriate food-grade packaging materials.',
    },
    {
      title: 'Reliable Supply Standards',
      desc: 'Our focus is on maintaining dependable quality and customer satisfaction.',
    },
  ];

  return (
    <Layout content={content}>
      {/* Header */}
      <section className="page-header">
        <div className="container-custom text-center">
          <h1 className="section-title">Certifications & Quality</h1>

          <p className="section-subtitle mx-auto">
            Building trust through certified standards, responsible handling,
            and a commitment to quality.
          </p>
        </div>
      </section>

      {/* FSSAI Certification */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">

          <div className="card p-8 text-center">

            <div className="tag mb-5">
              FSSAI Certified
            </div>

            <h2 className="font-display text-3xl font-semibold text-brand-ink mb-4">
              Food Safety & Standards Authority of India
            </h2>

            <p className="text-brand-ink-light leading-relaxed mb-8">
              Impal Foods operates in compliance with applicable food safety
              standards and maintains practices focused on hygiene, quality,
              and responsible handling. Our FSSAI certification reflects our
              commitment to providing dependable food products to our customers.
            </p>

            <div className="inline-flex items-center justify-center px-6 py-3 bg-brand-sand border border-brand-border rounded-xl">
              <span className="font-medium text-brand-ink">
                FSSAI License No: YOUR_FSSAI_LICENSE_NUMBER
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Quality Practices */}
      <section className="py-16 bg-brand-sand">
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="section-title">
              Quality Practices
            </h2>

            <p className="section-subtitle">
              Consistent standards maintained throughout our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {qualityPoints.map((point) => (
              <div
                key={point.title}
                className="card p-8 text-center"
              >
                <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                  {point.title}
                </h3>

                <p className="text-brand-ink-light leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl text-center">

          <h2 className="font-display text-3xl font-semibold text-brand-ink mb-4">
            Our Commitment to Quality
          </h2>

          <p className="text-brand-ink-light leading-relaxed text-lg">
            Quality, hygiene, and consistency remain central to our operations.
            Through responsible sourcing, careful handling, and quality-focused
            practices, we strive to provide products that meet customer
            expectations and build long-term trust.
          </p>

        </div>
      </section>
    </Layout>
  );
};

export default Certifications;
