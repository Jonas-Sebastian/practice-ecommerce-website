import axios from 'axios';

const API_URL_PRODUCTS = 'http://127.0.0.1:8000/api/practice-shop/products/';
const API_URL_CATEGORIES = 'http://127.0.0.1:8000/api/practice-shop/categories/';
const API_URL_REGISTER = 'http://127.0.0.1:8000/api/shop-admin/register/';
const API_URL_LOGIN = 'http://127.0.0.1:8000/api/shop-admin/login/';

class ApiService {
  // Products
  getAllProducts() {
    return axios.get(API_URL_PRODUCTS);
  }

  getProduct(id) {
    return axios.get(`${API_URL_PRODUCTS}${id}/`);
  }

  createProduct(data) {
    return axios.post(API_URL_PRODUCTS, data);
  }

  updateProduct(id, data) {
    return axios.put(`${API_URL_PRODUCTS}${id}/`, data);
  }

  deleteProduct(id) {
    return axios.delete(`${API_URL_PRODUCTS}${id}/`);
  }

  // Categories
  getAllCategories() {
    return axios.get(API_URL_CATEGORIES);
  }

  getCategory(id) {
    return axios.get(`${API_URL_CATEGORIES}${id}/`);
  }

  createCategory(data) {
    return axios.post(API_URL_CATEGORIES, data);
  }

  updateCategory(id, data) {
    return axios.put(`${API_URL_CATEGORIES}${id}/`, data);
  }

  deleteCategory(id) {
    return axios.delete(`${API_URL_CATEGORIES}${id}/`);
  }

  // User Registration
  registerUser(data) {
    return axios.post(API_URL_REGISTER, data);
  }

  // User Login
  loginUser(data) {
    return axios.post(API_URL_LOGIN, data);
  }
}

const apiServiceInstance = new ApiService();

export default apiServiceInstance;
