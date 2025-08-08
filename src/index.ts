import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import dishesRoutes from './routes/dishes';
import ordersRoutes from './routes/orders';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running' });
});

// API routes
app.use('/api/dishes', dishesRoutes);
app.use('/api/orders', ordersRoutes);

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
    console.error('Failed to start server:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
};

startServer();


