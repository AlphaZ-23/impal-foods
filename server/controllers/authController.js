const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc Admin login
// @route POST /api/auth/login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        _id: admin._id,
        username: admin.username,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginAdmin };
