const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createTask);
router.get('/:boardId', auth, getTasks);
router.delete('/:id', auth, deleteTask);

module.exports = router;
