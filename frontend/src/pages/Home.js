import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      // http://localhost:8000/api/boards
      const response = await axios.get('http://localhost:8000/api/boards', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBoards(response.data);
    };

    fetchBoards();
  }, [user.token]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    // http://localhost:8000/api/boards
    const response = await axios.post(
      'http://localhost:8000/api/boards',
      { name: boardName },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setBoards([...boards, response.data]);
    setBoardName('');
  };

  const handleDeleteBoard = async (id) => {
    // http://localhost:8000/api/boards/${id}
    await axios.delete(`http://localhost:8000/api/boards/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setBoards(boards.filter(board => board._id !== id));
  };

  const handleBoardClick = (id) => {
    navigate(`/boards/${id}`);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome, </h1>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      <form onSubmit={handleCreateBoard} className="board-form">
        <input
          type="text"
          placeholder="New Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="board-input"
        />
        <button className="create-button">Create Board</button>
      </form>
      <div className="board-list">
        {boards.map((board) => (
          <div key={board._id} className="board-item" onClick={() => handleBoardClick(board._id)}>
          <h2 onClick={() => handleBoardClick(board._id)}>{board.name}</h2>
          <button onClick={() => handleDeleteBoard(board._id)} className="delete-button">Delete Board</button>
            {/* Add task components and other functionalities here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
