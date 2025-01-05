import express from 'express';
import Todo from '../models/todo.js';
import validateTodo from '../middleware/validators/todo.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
const router = express.Router();

// Fetch all todos
router.get('/all',authenticate,authorize(['Admin']), async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err.message });
    }
});

// Fetch only pending todos
router.get('/pending',authenticate, async (req, res) => {
    try {
        const pendingTodos = await Todo.find({ status: 'pending' }); 
        res.status(200).json(pendingTodos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pending todos', error: err.message });
    }
});

// Fetch a single todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todo', error: err.message });
    }
});

// Create a new todo
router.post('/',validateTodo,async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTodo = new Todo({ title, description, status });
        await newTodo.save();
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating todo', error: err.message });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: 'Error updating todo', error: err.message });
    }
});

// Update status of a todo
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Status updated successfully', todo: updatedTodo });
    } catch (err) {
        res.status(400).json({ message: 'Error updating status', error: err.message });
    }
});

// Delete a todo
router.delete('/:id',authenticate,authorize(['Admin']), async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo', error: err.message });
    }
});

export default router;
