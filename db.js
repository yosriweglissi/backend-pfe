const mongoose = require('mongoose');

// MongoDB local connection URL with database name
const mongoURI = 'mongodb://localhost:27017/backend';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('MongoDB connected');
      // You can perform additional actions here if the connection is successful
  })
  .catch(err => {
      console.error('Error connecting to MongoDB:', err);
  });
