// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // Parse JSON data
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://supriyonag552:TOKeypeEkv1vVGHk@cluster0.27dzb.mongodb.net/freeTrialClasses?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for storing form data
const trialFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\d{10}$/, 'Enter a valid 10-digit mobile number'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
});

const TrialForm = mongoose.model('TrialForm', trialFormSchema);

// Define a route for handling form submissions
app.post('/submit-trial-form', async (req, res) => {
  try {
    const { name, mobile, email, state } = req.body;

    // Validate and save the form data
    const newForm = new TrialForm({ name, mobile, email, state });
    await newForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
