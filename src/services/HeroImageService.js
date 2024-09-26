import axios from 'axios';
import { API_URL_HERO_IMAGES } from './ApiService';

class HeroImageService {
  getAllHeroImages() {
    return axios.get(API_URL_HERO_IMAGES);
  }

  getHeroImage(id) {
    return axios.get(`${API_URL_HERO_IMAGES}${id}/`);
  }

  uploadHeroImage(data) {
    return axios.post(API_URL_HERO_IMAGES, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  updateHeroImage(id, data) {
    return axios.put(`${API_URL_HERO_IMAGES}${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  deleteHeroImage(id) {
    return axios.delete(`${API_URL_HERO_IMAGES}${id}/`);
  }
}

const heroImageServiceInstance = new HeroImageService();
export default heroImageServiceInstance;
