import api from "@/config/axios";
import toast from "react-hot-toast";



export const AJOUTER_STAGAIRE = async ({ data }) => {
    try {
        const res = await api.post('/stagaires', data)
        const data2 = res.data;
        return data2;
    } catch (error) {
        toast.error("Impossible de créer le compte. Veuillez réessayer.");
        return error.message;
    }
};
export const GET_STAGAIRES = async (params = {}) => {
    try {
        const res = await api.get("/stagaires", { params });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement des utilisateurs");
        return error.message;
    }
};

export const GET_STAGAIRE = async ({ id }) => {
    try {
        const res = await api.get(`/stagaires/${id}`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};
