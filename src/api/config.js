import axios from 'axios';
import { API_URL } from './constance';

const BASE_API = axios.create({
    baseURL: `${API_URL}`,
});

const API_WITH_TOKEN = (token) => {
    return axios.create({
        baseURL: `${API_URL}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

export { BASE_API, API_WITH_TOKEN }