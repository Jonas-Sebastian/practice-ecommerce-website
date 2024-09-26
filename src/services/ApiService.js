const BASE_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : 'http://127.0.0.1:8000/api';

export const API_URL_PRODUCTS = `${BASE_URL}/practice-shop/products/`;
export const API_URL_CATEGORIES = `${BASE_URL}/practice-shop/categories/`;
export const API_URL_REGISTER = `${BASE_URL}/shop-admin/register/`;
export const API_URL_LOGIN = `${BASE_URL}/shop-admin/login/`;
export const API_URL_HERO_IMAGES = `${BASE_URL}/shop-images/hero-images/`;
