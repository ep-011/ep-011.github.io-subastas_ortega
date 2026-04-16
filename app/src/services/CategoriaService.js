import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'categoria';

class CategoriaService {
getCategoria() {
    return axios.get(BASE_URL);
}
getCategoriaByID(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}
}

export default new CategoriaService();