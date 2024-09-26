import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN } from './ApiService';

class UserService {
  registerUser(data) {
    return axios.post(API_URL_REGISTER, data);
  }

  loginUser(data) {
    return axios.post(API_URL_LOGIN, data);
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
