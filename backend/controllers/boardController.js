const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
  const { name } = req.body;
  try {
    const board = new Board({ name, user: req.user.id });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: 'Error creating board' });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching boards' });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'Board deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting board' });
  }
};
