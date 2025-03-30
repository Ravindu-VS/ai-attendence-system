const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const User = require('./models/user'); // User model
const faceapi = require('face-api.js'); // Use face-api.js or any other face recognition library for processing

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable cross-origin requests

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store video in memory for now
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendance-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Sign-Up Route
app.post('/signup', upload.single('video'), async (req, res) => {
  const { name, registrationNumber, intake, stream, address, contactNumber, dob } = req.body;
  const videoFile = req.file;  // The uploaded video file

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ registrationNumber });
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    // Process the face video and extract the face encoding
    const faceEncoding = await processFaceVideo(videoFile); // This is a custom function

    // Create and save the new user with the face encoding
    const newUser = new User({
      name,
      registrationNumber,
      intake,
      stream,
      address,
      contactNumber,
      dob,
      faceEncoding,  // Storing face encoding in the database
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(400).send('Error during sign-up: ' + error.message);
  }
});

// Login Route (JWT)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error during login: ' + error.message);
  }
});

// Face Recognition Route (For later use to compare face)
app.post('/recognize-face', upload.single('video'), async (req, res) => {
  const videoFile = req.file;
  
  try {
    const faceEncoding = await processFaceVideo(videoFile);
    
    // Compare the face encoding with users in the database
    const matchedUser = await User.findOne({ faceEncoding: faceEncoding });
    if (matchedUser) {
      res.status(200).send({ message: 'Face matched', user: matchedUser });
    } else {
      res.status(400).send('No match found');
    }
  } catch (error) {
    console.error('Error during face recognition:', error);
    res.status(400).send('Error during face recognition: ' + error.message);
  }
});

// Function to process the video and extract face encodings
const processFaceVideo = async (videoFile) => {
  // You can use face-api.js, OpenCV, or other libraries to process the video and extract face encodings
  // For example, we use face-api.js to extract face embeddings from the video frames.
  
  const videoBuffer = videoFile.buffer; // Buffer of the video file
  const detections = await faceapi.detectAllFaces(videoBuffer);
  
  const faceEncodings = detections.map((detection) => detection.descriptor);  // This will give you face encodings
  
  return faceEncodings;
};

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
