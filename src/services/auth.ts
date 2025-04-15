import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async register(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
}; 