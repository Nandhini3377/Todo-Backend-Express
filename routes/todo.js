import express from 'express';
import Todo from '../models/todo.js';
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
        res.write('Hello');
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todo', error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTodo = new Todo({ title, description, status });
        await newTodo.save();
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating todo', error: err.message });
    }
});


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

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo', error: err.message });
    }
});

export default router;
