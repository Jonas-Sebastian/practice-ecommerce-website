import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN } from './ApiService';

class UserService {
    registerUser(data) {
        return axios.post(API_URL_REGISTER, data);
    }

    loginUser(data) {
        return axios.post(API_URL_LOGIN, data);
    }

    getAllUsers() {
        return axios.get('/api/shop-admin/admin-users/');
    }

    deleteUser(userId) {
        return axios.delete(`/api/shop-admin/admin-users/${userId}/`);
    }

    updateUser(userId, data) {
        return axios.put(`/api/shop-admin/admin-users/${userId}/`, data);
    }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
