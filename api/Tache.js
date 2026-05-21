import api from "@/config/axios";


// ── Taches ────────────────────────────────────────────────────────────────────
export const GET_TACHES = async ({ params = {} }) => {
    try {
        const res = await api.get(`/taches/`, { params });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};
export const GET_TACHE = async ({ id }) => {
    try {
        const res = await api.get(`/taches/${id}`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};

export const CREATE_TACHE = async ({ body }) => {
    try {
        const res = await api.post(`/taches`, body);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};

export const UPDATE_TACHE = async ({ id, body }) => {
    try {
        const res = await api.put(`/taches/${id}`, body);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};

export const DELETE_TACHE = async ({ id }) => {
    try {
        const res = await api.delete(`/taches/${id}`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};