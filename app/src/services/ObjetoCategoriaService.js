import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'objeto_categoria';

class ObjetoCategoriaService {
getObjetoCategoria() {
    return axios.get(BASE_URL);
}
getObjetoCategoriaById(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}
}

export default new ObjetoCategoriaService();