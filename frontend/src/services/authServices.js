import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

const signup = (username, email, password) => {
  return axios.post(`${API_URL}/signup`, { username, email, password });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export default { signup, login };
