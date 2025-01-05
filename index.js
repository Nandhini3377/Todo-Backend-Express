import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todo.js';
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';
const app = express();

connectDB();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));