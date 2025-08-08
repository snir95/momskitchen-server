import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/momskitchen');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error instanceof Error ? error.message : 'Unknown error');
    console.log('Please make sure MongoDB is running or set up a MongoDB Atlas connection in your .env file');
    console.log('For development, you can install MongoDB locally or use MongoDB Atlas');
    // Don't exit the process, just log the error
    console.log('Server will continue without database connection for now');
  }
};

export default connectDB;


