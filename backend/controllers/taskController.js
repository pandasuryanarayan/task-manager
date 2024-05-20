const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { name, boardId } = req.body;
    if (!name || !boardId) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    const task = new Task({ name, boardId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId });
    console.log(tasks);
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
