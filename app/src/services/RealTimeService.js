import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class RealtimeService {
    testEvento() {
        return axios.get(`${BASE_URL}/realtime/test`);
    }
}

export default new RealtimeService();