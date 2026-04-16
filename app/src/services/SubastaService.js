import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL + 'subasta';

class SubastaService {
    getSubastas() {
        return axios.get(BASE_URL);
    }
    getSubastaById(UserId) {
        return axios.get(BASE_URL + '/' + UserId);
    }
    getSubastaByObjeto(UserId) {
        return axios.get(BASE_URL + '/subastaPorObjeto/' + UserId);
    }

    getActivas() {
        return axios.get(BASE_URL + '/activas' );
    }

    getInactivas() {
        return axios.get(BASE_URL + '/inactivas' );
    }

    getMisSubastas(id) {
        return axios.get(BASE_URL + '/misSubastas/' + id);
    }

    getCantidadPujas(UserId){
        return axios.get(BASE_URL + '/cantidad_pujas/' + UserId);
    }

    createSubasta(objeto) {
    return axios.post(BASE_URL, JSON.stringify(objeto));
    }
    
    updateSubasta(Movie) {
        return axios({
        method: 'put',
        url: BASE_URL,
        data: JSON.stringify(Movie)
        })
    }

deleteSubasta(usuario){
return axios({
    method: 'put',
    url: BASE_URL + '/delete',
    data: JSON.stringify(usuario)
    })
}

publicarSubasta(usuario){
return axios({
    method: 'put',
    url: BASE_URL + '/publicar',
    data: JSON.stringify(usuario)
    })
}

    }
    export default new SubastaService();