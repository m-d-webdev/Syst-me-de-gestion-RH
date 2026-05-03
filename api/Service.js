import api from "@/config/axios";
import toast from "react-hot-toast";


export const GET_SERVICES = async ({ isActive, search, division_id } = {}) => {
    try {
        const params = {};
        if (isActive !== undefined) params.isActive = isActive;
        if (search) params.search = search;
        if (division_id) params.division_id = division_id;

        const res = await api.get("/service", { params });
        return res.data;
    } catch (error) {
        toast.error("Échec du chargement des services");
        return error.message;
    }
};

export const GET_SERVICE = async ({ id }) => {
    try {
        const res = await api.get(`/service/${id}`);
        return res.data;
    } catch (error) {
        toast.error("Échec du chargement du service");
        return error.message;
    }
};

export const CREATE_SERVICE = async ({ data }) => {
    try {
        const res = await api.post("/service", data);
        toast.success("Service créé avec succès");
        return res.data;
    } catch (error) {
        toast.error("Échec de la création du service");
        return error.message;
    }
};

export const UPDATE_SERVICE = async ({ id, data }) => {
    try {
        const res = await api.put(`/service/${id}`, data);
        toast.success("Service mis à jour avec succès");
        return res.data;
    } catch (error) {
        toast.error("Échec de la mise à jour du service");
        return error.message;
    }
};

export const DELETE_SERVICE = async ({ id }) => {
    try {
        const res = await api.delete(`/service/${id}`);
        toast.success("Service supprimé avec succès");
        return res.data;
    } catch (error) {
        toast.error("Échec de la suppression du service");
        return error.message;
    }
};