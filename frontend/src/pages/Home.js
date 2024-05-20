import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, logout, User } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');

  console.log(user.username);
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get('http://localhost:8000/api/boards', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBoards(response.data);
    };

    fetchBoards();
  }, [user.token]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      'http://localhost:8000/api/boards',
      { name: boardName },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setBoards([...boards, response.data]);
    setBoardName('');
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
          <div key={board._id} className="board-item">
            <h2>{board.name}</h2>
            {/* Add task components and other functionalities here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
