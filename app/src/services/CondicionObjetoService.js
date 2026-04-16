import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'condicion_objeto';

class CondicionObjetoService {
getCondicionObjeto() {
    return axios.get(BASE_URL);
}
getCondicionObjetobyID(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}
}

export default new CondicionObjetoService();