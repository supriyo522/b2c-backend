const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const trialFormRoutes = require('./routes/trialFormRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
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

// Use routes
app.use('/api', trialFormRoutes);
app.use('/api', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
