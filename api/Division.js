import api from "@/config/axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";



export const GET_DIVISIONS = async (isActive, search) => {
    try {

        const params = {};
        if (isActive !== undefined) params.isActive = isActive;
        if (search) params.search = search;

        const res = await api.get('/division', { params })
        const data2 = res.data;
        return data2;

    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement des divisions");
        return error.message;
    }
};



export const GET_DIVISION = async ({ id }) => {
    try {
        const res = await api.get(`/division/${id}`);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de la division");
        return error.message;
    }
};

export const CREATE_DIVISION = async ({ data }) => {
    try {
        const res = await api.post("/division", data);
        toast.success("Division créée avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la création de la division");
        return error.message;
    }
};

export const UPDATE_DIVISION = async ({ id, data }) => {
    try {
        const res = await api.put(`/division/${id}`, data);
        toast.success("Division mise à jour avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la mise à jour de la division");
        return error.message;
    }
};

export const DELETE_DIVISION = async ({ id }) => {
    try {
        const res = await api.delete(`/division/${id}`);
        toast.success("Division supprimée avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la suppression de la division");
        return error.message;
    }
};
