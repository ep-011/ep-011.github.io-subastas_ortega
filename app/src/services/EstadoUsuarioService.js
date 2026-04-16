import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'estado_usuario';

class EstadoUsuarioService {
getEstadoUsuario() {
    return axios.get(BASE_URL);
}
getEstadoUsuariobyID(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}
}

export default new EstadoUsuarioService();