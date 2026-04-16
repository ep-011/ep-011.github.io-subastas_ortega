import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'puja';

class PujasService {
    getPujas() {
        return axios.get(BASE_URL);
    }
    getPujaByID(UserId) {
        return axios.get(BASE_URL + '/' + UserId);
    }
    getPujasPorSubasta(UserId) {
        return axios.get(BASE_URL + '/pujasPorSubasta/' + UserId);
    }
    }
    export default new PujasService();