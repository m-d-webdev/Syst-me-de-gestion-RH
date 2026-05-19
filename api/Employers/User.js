import api from "@/config/axios";
import toast from "react-hot-toast";

export const GET_USERS = async (params = {}) => {
    try {
        const res = await api.get("/users", { params });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement des utilisateurs");
        return error.message;
    }
};

export const GET_USER = async ({ id }) => {
    try {
        const res = await api.get(`/users/${id}`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'utilisateur");
        return error.message;
    }
};

export const CREATE_USER = async ({ data }) => {
    try {
        const res = await api.post("/user", data);
        toast.success("Utilisateur créé avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la création de l'utilisateur");
        return error.message;
    }
};

export const UPDATE_USER = async ({ id, data }) => {
    try {
        const res = await api.put(`/user/${id}`, data);
        toast.success("Utilisateur mis à jour avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la mise à jour de l'utilisateur");
        return error.message;
    }
};

export const DELETE_USER = async ({ id }) => {
    try {
        const res = await api.delete(`/user/${id}`);
        toast.success("Utilisateur supprimé avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la suppression de l'utilisateur");
        return error.message;
    }
};

export const UPDATE_USER_PASSWORD = async ({ id, data }) => {
    try {
        const res = await api.patch(`/user/${id}/password`, data);
        toast.success("Mot de passe mis à jour avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la mise à jour du mot de passe");
        return error.message;
    }
};

export const TOGGLE_USER_STATUS = async ({ id }) => {
    try {
        const res = await api.patch(`/user/${id}/toggle-status`);
        toast.success("Statut de l'utilisateur mis à jour");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la mise à jour du statut");
        return error.message;
    }
};



export const FetchGrads = async () => {
    try {
        const res = await api.get(`/getGrades`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'grades");
        return error.message;
    }
};

export const FetchOffices = async () => {
    try {
        const res = await api.get(`/getOffices`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de l'Offices");
        return error.message;
    }
};