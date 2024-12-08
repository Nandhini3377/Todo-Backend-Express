import mongoose from 'mongoose';
const todoModel=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Todo',todoModel);