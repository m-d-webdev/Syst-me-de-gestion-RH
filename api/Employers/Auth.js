import api from "@/config/axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



export const REGISTER = async ({ data }) => {
    try {

        const res = await api.post('/users/register', data)
        const data2 = res.data;
        return data2;

    } catch (error) {
        toast.error("Impossible de créer le compte. Veuillez réessayer.");
        return error.message;
    }
};

export const AUTH = async () => {
    try {
        const res = await api.get('/users/auth')
        const data2 = res.data;
        return data2;
    } catch (error) {
        toast.error("Session invalide. Veuillez vous reconnecter.");

        return error.message;
    }
};

export const CHECK_EXTRADATA_TOKEN = async (token) => {
    try {
        const res = await api.post('/users/check_extradata_token', { token })
        const data2 = res.data;
        return data2;
    } catch (error) {
        toast.error("Session invalide. Veuillez vous reconnecter.");

        return error.message;
    }
};


export const GET_EXTRADATA_TOKEN = async (code) => {
    try {
        const res = await api.post('/users/requestTokenToDecryptExtraUserData', { code })
        const data2 = res.data;
        return data2;
    } catch (error) {
        toast.error("Code n est pas correct.");
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
                toast.error("Identifiants invalides. Veuillez réessayer.");
                reject(error?.response?.data ?? "Identifiants invalides. Veuillez réessayer.");
            }
        }
    );
};


export const LOGOUT = () => {
    try {
        Cookies.remove("token")
        if (typeof (window) != undefined) {
            window.location.href = "/login"
        }

    } catch (error) {
        return error.message;
    }
};
