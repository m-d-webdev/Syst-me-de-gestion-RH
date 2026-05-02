import api from "@/config/axios";
import Cookies from "js-cookie";
export const REGISTER = async ({ data }) => {
    try {
        const res = await api.post('/users/register', data)
        const data2 = res.data;
        return data2;
    } catch (error) {
        return error.message;
    }
};
export const AUTH = async () => {
    try {
        const res = await api.get('/users/auth')
        const data2 = res.data;
        return data2;
    } catch (error) {
        return error.message;
    }
};

export const LOGIN = async ({ email, password }) => {
    return new Promise(
        async (resolve, reject) => {
            try {
                const res = await api.post('/users/login', { email, password })
                const data2 = res.data;
                resolve(data2);

            } catch (error) {
                reject(error?.response?.data ?? "Identifiants invalides. Veuillez réessayer.");
            }
        }
    );
};
export const LOGOUT =  () => {
    try {
        Cookies.remove("token")
        if (typeof (window) != undefined) {
            window.location.href = "/login"
        }

    } catch (error) {
        return error.message;
    }
};
