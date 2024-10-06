import axios from 'axios';
import { API_URL_PRODUCTS } from './ApiService';

class ProductService {
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

  searchProducts(query, categoryId = null) {
    let url = `${API_URL_PRODUCTS}search/?q=${query}`;
    
    if (categoryId) {
      url += `&category=${categoryId}`;
    }
    
    return axios.get(url);
  }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
