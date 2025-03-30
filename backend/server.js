// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user'); // Ensure the casing matches

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendance-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Sign-Up Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received sign-up request:', req.body);  // Log received data
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      console.log('User exists check:', userExists);  // Log the result of findOne
  
      if (userExists) {
        return res.status(400).send('User already exists');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save the new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      console.log('User saved successfully:', newUser);  // Log successful save
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error during sign-up:', error);  // Log any error
      res.status(400).send('Error during sign-up: ' + error.message);
    }
  });
  
// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error during login: ' + error.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
