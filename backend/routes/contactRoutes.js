const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST request to save form data
router.post('/submit-form', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Create a new contact entry
    const newContact = new Contact({ name, email, phone, subject, message });

    // Save to MongoDB
    await newContact.save();

    res.status(201).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
