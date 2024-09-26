const BASE_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : 'http://127.0.0.1:8000/api';

export const API_URL_USERS = `${BASE_URL}/shop-admin/admin-users/`; // UserService.js : for updating/deleting admin/staff user accounts
export const API_URL_PRODUCTS = `${BASE_URL}/practice-shop/products/`; // ProductService.js : for updating/deleting products
export const API_URL_CATEGORIES = `${BASE_URL}/practice-shop/categories/`; // CategoryService.js : for updating/deleting product categories
export const API_URL_REGISTER = `${BASE_URL}/shop-admin/register/`; // UserSerivce.js : for handling admin/staff account registration
export const API_URL_LOGIN = `${BASE_URL}/shop-admin/login/`; // UserSerivce.js : for handling login authentication
export const API_URL_HERO_IMAGES = `${BASE_URL}/shop-images/hero-images/`; // HeroImageService.js : for updating/deleting the Shop Home Page banner/image
