import axios from "axios";

const api = axios.create({ baseURL: "https://edu.tardigrade.land/msg" });

export const webSocketApi = axios.create({baseURL: "wss://edu.tardigrade.land/msg"})

export default api;
