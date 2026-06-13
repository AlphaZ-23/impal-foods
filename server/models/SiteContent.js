const mongoose = require('mongoose');

// Single-document collection storing all editable site content
const siteContentSchema = new mongoose.Schema(
  {
    // Company Info
    companyName: { type: String, default: 'Impal Foods' },
    tagline: { type: String, default: 'PURITY • TRUST • QUALITY' },
    establishedYear: { type: String, default: '2026' },
    businessType: { type: String, default: 'Wholesaler' },

    // Home Page
    homeIntro: {
      type: String,
      default:
        'Impal Foods is a trusted supplier of essential food products sourced from India\'s agricultural regions, committed to purity, hygiene, and quality assurance.',
    },

    // About Us Page
    aboutStory: {
      type: String,
      default:
        'Impal Foods started with a simple belief that everyday kitchen essentials deserve the highest level of care and quality. We specialize in delivering premium Sugar and authentic Poha while maintaining strict hygiene and packaging standards.',
    },
    mission: {
      type: String,
      default:
        'To deliver pure, hygienic, and high-quality food essentials that bring trust, health, and satisfaction to every household at an affordable value.',
    },
    vision: {
      type: String,
      default:
        'To become a trusted and recognized food brand in India by consistently delivering purity, quality, and excellence in every product.',
    },
    manufacturingProcess: {
      type: String,
      default:
        'Our manufacturing process emphasizes hygienic handling, multi-stage quality checks, and modern, food-grade packaging standards to ensure every product reaches you fresh and safe.',
    },

    // Certifications Page
    certificationInfo: {
      type: String,
      default:
        'Impal Foods is FSSAI Verified and follows strict quality control standards including hygienic processing, multi-stage quality checks, secure packaging, and certified food-grade handling.',
    },
    fssaiVerified: { type: Boolean, default: true },

    // Contact Info
    address: {
      type: String,
      default: '44/4, Pardeshipura, Indore (M.P.) – 452003',
    },
    phone: { type: String, default: '+91 99934 08621' },
    email: { type: String, default: 'impalfoodscontact@gmail.com' },
    mapEmbedUrl: {
      type: String,
      default:
        'https://www.google.com/maps?q=44/4,+Pardeshipura,+Indore,+Madhya+Pradesh+452003&output=embed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', siteContentSchema);
