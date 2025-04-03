const express = require('express');
const router = express.Router();
const TrialForm = require('../models/TrialForm');

// Handle form submission
router.post('/submit-trial-form', async (req, res) => {
  try {
    const { name, mobile, email, state } = req.body;
    
    const newForm = new TrialForm({ name, mobile, email, state });
    await newForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
