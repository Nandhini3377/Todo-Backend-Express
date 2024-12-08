import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todo.js';
import connectDB from './middleware/db.js';
const app = express();

connectDB();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));