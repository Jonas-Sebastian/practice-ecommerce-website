import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN, API_URL_USERS } from './ApiService';

class UserService {
    registerUser(data) {
        return axios.post(API_URL_REGISTER, data);
    }

    loginUser(data) {
        return axios.post(API_URL_LOGIN, data);
    }

    getAllUsers() {
        return axios.get(API_URL_USERS);
    }

    deleteUser(userId) {
        return axios.delete(`${API_URL_USERS}${userId}/`);
    }

    updateUser(userId, data) {
        return axios.put(`${API_URL_USERS}${userId}/`, data);
    }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
