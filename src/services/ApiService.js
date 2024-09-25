import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api` || 'http://127.0.0.1:8000/api';

const API_URL_PRODUCTS = `${BASE_URL}/practice-shop/products/`;
const API_URL_CATEGORIES = `${BASE_URL}/practice-shop/categories/`;
const API_URL_REGISTER = `${BASE_URL}/shop-admin/register/`;
const API_URL_LOGIN = `${BASE_URL}/shop-admin/login/`;
const API_URL_HERO_IMAGES = `${BASE_URL}/shop-images/hero-images/`;

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

  // Hero Images
  getAllHeroImages() {
    return axios.get(API_URL_HERO_IMAGES);
  }

  getHeroImage(id) {
    return axios.get(`${API_URL_HERO_IMAGES}${id}/`);
  }

  uploadHeroImage(data) {
    return axios.post(API_URL_HERO_IMAGES, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  updateHeroImage(id, data) {
    return axios.put(`${API_URL_HERO_IMAGES}${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteHeroImage(id) {
    return axios.delete(`${API_URL_HERO_IMAGES}${id}/`);
  }
}

const apiServiceInstance = new ApiService();

export default apiServiceInstance;
