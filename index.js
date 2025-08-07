const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const dishesRoutes = require('./routes/dishes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// API routes
app.use('/api/dishes', dishesRoutes);

// Start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Backend is running');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
