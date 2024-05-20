import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/' element={<Home />}/> */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          {/* <PrivateRoute path="/" element={<Home />} /> */}
        </Routes>
        {/* <Route path="/" element={<PrivateRoute element={<Home />} />} /> */}
        {/* <PrivateRoute path="/" element={<Home />} /> */}
      </Router>
      {/* <PrivateRoute path="/" element={<Home />} /> */}
    </AuthProvider>
  );
}

export default App;
