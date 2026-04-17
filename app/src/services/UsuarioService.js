import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'usuario';

class UsuarioService {
getUsuarios() {
    return axios.get(BASE_URL);
}
getUsuarioById(UserId) {
    return axios.get(BASE_URL + '/' + UserId);
}

getVendedores() {
    return axios.get(BASE_URL + '/vendedores/');
}

getPujasDelUsuario(UserId) {
    return axios.get(BASE_URL + '/pujasDelUsuario/' + UserId);
}

getSubastasCreadas(UserId) {
    return axios.get(BASE_URL + '/subastasCreadas/' + UserId);
}

updateUsuario(usuario) {
return axios({
    method: "put",
    url: BASE_URL,
    data: usuario,
    });
}

deleteUsuario(usuario){
return axios({
    method: 'put',
    url: BASE_URL + '/delete',
    data: JSON.stringify(usuario)
    })
}

createUser(User) {
    return axios.post(BASE_URL, JSON.stringify(User));
}
loginUser(User) {
    return axios.post(BASE_URL + '/login/', JSON.stringify(User));
}

}

export default new UsuarioService();