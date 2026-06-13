const SiteContent = require('../models/SiteContent');

// Helper to get the single content doc, creating it if it doesn't exist
const getOrCreateContent = async () => {
  let content = await SiteContent.findOne();
  if (!content) {
    content = await SiteContent.create({});
  }
  return content;
};

// @desc Get site content (public)
// @route GET /api/content
const getContent = async (req, res) => {
  try {
    const content = await getOrCreateContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Update site content (admin only)
// @route PUT /api/content
const updateContent = async (req, res) => {
  try {
    const content = await getOrCreateContent();

    const allowedFields = [
      'companyName',
      'tagline',
      'establishedYear',
      'businessType',
      'homeIntro',
      'aboutStory',
      'mission',
      'vision',
      'manufacturingProcess',
      'certificationInfo',
      'fssaiVerified',
      'address',
      'phone',
      'email',
      'mapEmbedUrl',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
      }
    });

    const updated = await content.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getContent, updateContent };
