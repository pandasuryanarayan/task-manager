const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, board } = req.body;
  try {
    const task = new Task({ title, description, board });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tasks' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
};
