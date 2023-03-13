import axios from "axios";

const api = axios.create({ baseURL: "https://edu.tardigrade.land/msg" });

export default api;
