import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

export default api;