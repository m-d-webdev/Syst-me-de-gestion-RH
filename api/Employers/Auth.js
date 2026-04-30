import api from "@/config/axios";

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


export const LOGIN = async ({ data }) => {
    try {
        const res = await api.post('/login', data)
        const data2 = res.data;
        return data2;
    } catch (error) {
        return " error.message";
    }
};