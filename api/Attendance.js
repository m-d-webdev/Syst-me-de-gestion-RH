import api from "@/config/axios";
import toast from "react-hot-toast";

// 🔹 Get all attendances
export const GET_ATTENDANCES = async ({
    user_id,
    date,
    status,
} = {}) => {
    try {
        const params = {};

        if (user_id) params.user_id = user_id;
        if (date) params.date = date; // format: "05-05-2026"
        if (status) params.status = status;

        const res = await api.get("/attendance", { params });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement des présences");
        return error.response?.data || error.message;
    }
};

// 🔹 Get single attendance
export const GET_ATTENDANCE = async ({ id }) => {
    try {
        
        const res = await api.get(`/attendance/${id}`);
        return res.data;

    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec du chargement de la présence");
        return error.response?.data || error.message;
    }
};


// 🔹 Create attendance
export const CREATE_ATTENDANCE = async (data) => {
    try {

        const res = await api.post("/attendance/checkin", data);
        toast.success("Présence enregistrée avec succès");
        return res.data;

    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de l'enregistrement de la présence");
        return error.response?.data || error.message;
    }
};

// 🔹 Update attendance
export const UPDATE_ATTENDANCE = async ({
    id,
    data,
}) => {
    try {
        const res = await api.put(`/attendance/${id}`, data);
        toast.success("Présence mise à jour avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la mise à jour de la présence");
        return error.response?.data || error.message;
    }
};

// 🔹 Delete attendance
export const DELETE_ATTENDANCE = async ({ id }) => {
    try {
        const res = await api.delete(`/attendance/${id}`);
        toast.success("Présence supprimée avec succès");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message ?? "Échec de la suppression de la présence");
        return error.response?.data || error.message;
    }
};