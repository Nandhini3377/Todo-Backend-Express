
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    role: { type: String, enum: ['User', 'Admin', 'Manager'], default: 'User' },
  });
  
  export default mongoose.model("user", userSchema);