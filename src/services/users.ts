import api from "../boot/axios";
export const login = (params: any) => api.post("/login", params);
