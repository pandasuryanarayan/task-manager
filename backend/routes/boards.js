const express = require('express');
const { createBoard, getBoards, deleteBoard } = require('../controllers/boardController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createBoard);
router.get('/', auth, getBoards);
router.delete('/:id', auth, deleteBoard);

module.exports = router;
