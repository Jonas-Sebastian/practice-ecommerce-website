import axios from 'axios';

const API_URL_PRODUCTS = 'http://127.0.0.1:8000/api/products/';
const API_URL_CATEGORIES = 'http://127.0.0.1:8000/api/categories/';

class ProductService {
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
}

const productServiceInstance = new ProductService();

export default productServiceInstance;