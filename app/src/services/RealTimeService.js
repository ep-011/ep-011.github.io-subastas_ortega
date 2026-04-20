import axios from "axios";
import Pusher from "pusher-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class RealtimeService {
    constructor() {
        this.pusher = new Pusher("4985d5a6019b1c31e2aa", {
            cluster: "us2",
        });
    }

    subscribe(channelName) {
        let channel = this.pusher.channel(channelName);

        if (!channel) {
            channel = this.pusher.subscribe(channelName);
        }

        return channel;
    }

    unsubscribe(channelName) {
        const channel = this.pusher.channel(channelName);

        if (channel) {
            channel.unbind_all();
            this.pusher.unsubscribe(channelName);
        }
    }

    disconnect() {
        this.pusher.disconnect();
    }

    testEvento() {
        return axios.get(`${BASE_URL}/realtime/test`);
    }
}

export default new RealtimeService();