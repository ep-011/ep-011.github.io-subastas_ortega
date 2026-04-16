import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'estado_objeto';

class EstadoObjetoService {
getEstadoObjeto() {
    return axios.get(BASE_URL);
}
getEstadoObjetobyID(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}
}

export default new EstadoObjetoService();