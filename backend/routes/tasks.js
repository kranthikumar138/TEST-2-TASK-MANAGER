const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /tasks
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({ title, description });
    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
