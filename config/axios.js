import axios from "axios";
import Cookies from "js-cookie";
const BACKEND_URL = process.env.BACKEND_URL
const api = axios.create({
    baseURL: BACKEND_URL || "http://localhost:8000/api",
    timeout: 10000,
    withCredentials: true

});

// Request interceptor — attach auth token if present
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
    (response) => {
        if (response.data.token) { Cookies.set("token", response.data.token) }
        if (response.data.data?.token) { Cookies.set("token", response.data.data?.token) }
        return response
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                Cookies.remove("token");
                window.location.href = "/login";
            }

            if (status === 403) {
                console.error("Forbidden: you don't have access to this resource.");
            }

            if (status >= 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.request) {
            console.error("Network error: no response received from server.");
        }

        return Promise.reject(error);
    }
);

export default api;