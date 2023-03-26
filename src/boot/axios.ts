import axios from "axios";

const api = axios.create({ baseURL: "https://edu.tardigrade.land/msg" });

export const webSocketApi = axios.create({baseURL: "wss://edu.tardigrade.land/msg/ws/channel/{channel_id}/token/{token}"})

export default api;
