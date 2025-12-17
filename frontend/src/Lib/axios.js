import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/user"

const api = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
})

export default api;