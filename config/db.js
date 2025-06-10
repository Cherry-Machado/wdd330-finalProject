const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));
  
// Import the Vacante model to ensure it's registered
require('../models/vacantes'); // Import the Vacante model to ensure it's registered