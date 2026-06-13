const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const SiteContent = require('../models/SiteContent');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Seed Admin
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_EMAIL || 'admin' });
    if (!adminExists) {
      await Admin.create({
        username: process.env.ADMIN_EMAIL || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Seed Site Content
    const contentExists = await SiteContent.findOne();
    if (!contentExists) {
      await SiteContent.create({});
      console.log('Site content initialized with defaults');
    } else {
      console.log('Site content already exists');
    }

    // Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        {
          name: 'Premium Refined Sugar',
          category: 'Sugar',
          description:
            'A premium quality refined sugar designed for daily household use. It ensures purity, consistent sweetness, and safe consumption standards. Carefully processed and packed under hygienic conditions.',
          ingredients: '100% Refined Sugar',
          images: [],
          featured: true,
        },
        {
          name: 'Authentic Poha (Flattened Rice)',
          category: 'Poha',
          description:
            'High-quality flattened rice (Poha) known for its light texture and authentic taste. Processed using selected grains to maintain freshness and nutritional value.',
          ingredients: 'Flattened Rice (Rice)',
          images: [],
          featured: true,
        },
      ]);
      console.log('Sample products created');
    } else {
      console.log('Products already exist, skipping');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
