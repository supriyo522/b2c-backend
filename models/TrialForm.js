const mongoose = require('mongoose');

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

module.exports = mongoose.model('TrialForm', trialFormSchema);
