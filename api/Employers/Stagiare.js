import api from "@/config/axios";
import toast from "react-hot-toast";



export const AJOUTER_STAGAIRE = async ({ data }) => {
    try {

        const res = await api.post('/stagaires/register', data)
        const data2 = res.data;
        return data2;

    } catch (error) {
        toast.error("Impossible de créer le compte. Veuillez réessayer.");
        return error.message;
    }
};
