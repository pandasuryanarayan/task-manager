import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Board = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    // http://localhost:8000/api/tasks/${id}
    const fetchTasks = async () => {
      const response = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, [id, user.token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    // http://localhost:8000/api/tasks
    const response = await axios.post(
      `http://localhost:8000/api/tasks`,
      { name: taskName, boardId: id },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setTasks([...tasks, response.data]);
    setTaskName('');
  };

  const handleDeleteBoard = async (id) => {
    // http://localhost:8000/api/tasks/${id}
    await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Tasks</h1>
      </div>
      <form onSubmit={handleCreateTask} className="task-form">
        <input
          type="text"
          placeholder="New Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="task-input"
        />
        <button className="create-button">Create Task</button>
      </form>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h2>{task.name}</h2>
            <button onClick={() => handleDeleteBoard(task._id)} className="delete-button">Delete Board</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
