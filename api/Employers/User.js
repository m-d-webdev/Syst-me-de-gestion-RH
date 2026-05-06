import api from "@/config/axios";
import toast from "react-hot-toast";

export const GET_USERS = async ({ isActive, search, role, division_id, service_id } = {}) => {
    try {

        const params = {};
        if (isActive !== undefined) params.isActive = isActive;
        if (search) params.search = search;
        if (role) params.role = role;
        if (division_id) params.division_id = division_id;
        if (service_id) params.service_id = service_id;

        const res = await api.get("/users", { params });
        return res.data;

    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement des utilisateurs");
        return error.message;
    }
};

export const GET_USER = async ({ id }) => {
    try {
        const res = await api.get(`/user/${id}`);
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