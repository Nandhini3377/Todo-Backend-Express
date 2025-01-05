

import { connect } from 'mongoose';
  
const connectDB = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
