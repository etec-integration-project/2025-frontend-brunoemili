import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const userService = {
  async getWishlist() {
    const response = await axios.get(`${API_URL}/user/wishlist`, getAuthHeader());
    return response.data;
  },

  async toggleWishlist(gameId: string) {
    const response = await axios.post(
      `${API_URL}/user/wishlist/${gameId}`,
      {},
      getAuthHeader()
    );
    return response.data;
  },

  async getCart() {
    const response = await axios.get(`${API_URL}/user/cart`, getAuthHeader());
    return response.data;
  },

  async addToCart(gameId: string, quantity: number = 1) {
    const response = await axios.post(
      `${API_URL}/user/cart`,
      { gameId, quantity },
      getAuthHeader()
    );
    return response.data;
  },

  async removeFromCart(gameId: string) {
    const response = await axios.delete(
      `${API_URL}/user/cart/${gameId}`,
      getAuthHeader()
    );
    return response.data;
  },

  async checkout(shippingAddress: ShippingAddress) {
    const response = await axios.post(
      `${API_URL}/orders/checkout`,
      { shippingAddress },
      getAuthHeader()
    );
    return response.data;
  },

  async getOrders() {
    const response = await axios.get(
      `${API_URL}/orders`,
      getAuthHeader()
    );
    return response.data;
  }
}; 