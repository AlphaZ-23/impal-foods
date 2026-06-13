
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';

const About = () => {
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
          <h1 className="section-title">About Us</h1>
          <p className="section-subtitle mx-auto">
            From our hands to your heart — Impal Foods is dedicated to delivering freshness, trust, and happiness in every bite.
          </p>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl font-semibold text-brand-ink mb-4">
            About Impal Foods
          </h2>

          <p className="text-brand-ink-light leading-relaxed text-lg">
            {content?.aboutStory ||
              'At Impal Foods, we believe that great food is a journey of passion, purity, and precision. Our story begins at the very root, where we carefully select only the finest and highest-quality raw ingredients. From there, the magic moves to our state-of-the-art manufacturing facility, where we combine traditional tastes with modern technology while maintaining the strictest hygiene and quality standards at every step.'}
          </p>

          <p className="text-brand-ink-light leading-relaxed text-lg mt-4">
            At Impal Foods, we believe that great food is a journey of passion, purity, and precision. Our story begins at the very root, where we carefully select only the finest and highest-quality raw ingredients. From there, the magic moves to our state-of-the-art manufacturing facility. Here, we combine traditional tastes with modern technology, maintaining the strictest hygiene and quality standards at every single step.
            But our job doesn’t end at production. We pack our products with utmost care to lock in freshness and flavor. Through a seamless supply chain and trusted delivery network, we ensure that our products travel safely from our factory floor straight to your local stores and doorstep. From our hands to your heart, Impal Foods is dedicated to delivering freshness, trust, and happiness in every bite.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-brand-sand">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="card p-8">
              <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                Our Mission
              </h3>

              <p className="text-brand-ink-light leading-relaxed">
                {content?.mission ||
                  'To provide quality food products that meet customer expectations while maintaining high standards of hygiene, reliability, and service.'}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                Our Vision
              </h3>

              <p className="text-brand-ink-light leading-relaxed">
                {content?.vision ||
                  'To be recognized as a trusted supplier of food products by consistently delivering quality, value, and dependable service.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="section-title">
              Why Choose Impal Foods
            </h2>

            <p className="section-subtitle">
              Committed to quality at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="card p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                Quality Focus
              </h3>

              <p className="text-brand-ink-light">
                Products selected and handled with attention to quality standards.
              </p>
            </div>

            <div className="card p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                Hygienic Practices
              </h3>

              <p className="text-brand-ink-light">
                Emphasis on cleanliness, safety, and proper packaging.
              </p>
            </div>

            <div className="card p-8 text-center">
              <h3 className="font-display text-xl font-semibold text-brand-ink mb-3">
                Reliable Supply
              </h3>

              <p className="text-brand-ink-light">
                Consistent availability and dependable service for customers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Quality & Handling */}
      <section className="py-16 bg-brand-sand">
        <div className="container-custom max-w-4xl">

          <h2 className="font-display text-3xl font-semibold text-brand-ink mb-4">
            Quality & Handling
          </h2>

          <p className="text-brand-ink-light leading-relaxed text-lg">
            {content?.manufacturingProcess ||
              'We maintain a strong focus on quality control, hygienic handling, and proper packaging practices to ensure our products reach customers in the best possible condition.'}
          </p>

        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-brand-ink">
        <div className="container-custom text-center">

          <h2 className="font-display text-3xl font-semibold text-white mb-4">
            Looking for reliable food product supply?
          </h2>

          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Contact us to learn more about our products and wholesale supply options.
          </p>

          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>

        </div>
      </section>

    </Layout>
  );
};

export default About;
