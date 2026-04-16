import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'objeto';

class ObjetoService {
    getObjetos() {
        return axios.get(BASE_URL);
    }
    getObjetoById(UserId) {
        return axios.get(BASE_URL + '/' + UserId);
    }

createObjeto(objeto) {
    return axios.post(BASE_URL, JSON.stringify(objeto));
    }
    
    updateObjeto(Movie) {
        return axios({
        method: 'put',
        url: BASE_URL,
        data: JSON.stringify(Movie)
        })
    }

    deleteObjeto(usuario){
return axios({
    method: 'put',
    url: BASE_URL + '/delete',
    data: JSON.stringify(usuario)
    })
}

    }
    export default new ObjetoService();