"use client"
import { useState } from "react";
import Dialog from "../Global/Dialog";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import Loader1 from "../Global/Loader1";
import { CREATE_SERVICE } from "@/api/Service";

const EMPTY_FORM = { name: "", ar_name: "", description: "", isActive: true };

export default function CreateServiceForm({ onUpdate, division_id, onClose }) {
    const [form, setForm] = useState({ ...EMPTY_FORM, division_id });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [Loading, setLoading] = useState(false);

    const validate = (data) => {
        const errs = {};
        if (!data.name.trim()) errs.name = "Service name is required.";
        else if (data.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
        if (!data.description.trim()) errs.description = "Description is required.";
        else if (data.description.trim().length < 10) errs.description = "Description must be at least 10 characters.";
        return errs;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newForm = { ...form, [name]: type === "checkbox" ? checked : value };
        setForm(newForm);
        if (errors[name]) {
            setErrors(validate(newForm));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setLoading(true)

        try {
            const res = await CREATE_SERVICE({ data: form })
            if (res.success == true) {
                setSubmitted(true);
                onUpdate();
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)

        }

    };

    return (
        <Dialog closeIfClickOutside={false} containerClassName="w-[500] !bg-background p-4" onClose={onClose}>
            {/* Header */}
            <div className="mb-8 w-full flex justify-between items-start ">
                <div className="">

                    <h1 className="text-2xl tracking-tighter font-semibold ">Créer un nouveau service</h1>
                    <p className="text-sm opacity-70 mt-1">
                        Veuillez remplir les informations ci-dessous pour créer une nouveau service.
                    </p>
                </div>
                <button onClick={onClose} className="p-1 bg-sidebar rounded-sm border border-foreground/10 flex items-center gap-2">
                    <X className="h-4" />
                </button>
            </div>
            {/* Card */}

            {/* Name */}

            <Input
                label={"Nom"}
                id="name"
                name="name"
                type="text"
                parentclassName="bg-sidebar"
                value={form.name}
                onChange={handleChange}
                placeholder="Nom de le service"
                className={``}
            />
            <Input
                label={"الاسم بالعربية"}
                id="ar_name"
                name="ar_name"
                type="text"
                parentclassName="bg-sidebar "
                value={form.ar_name}
                onChange={handleChange}
                placeholder="اسم القسم"
                className={``}
            />

            {errors.name && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {errors.name}
                </p>
            )}

            {/* Description */}
            <div className="flex mt-4  flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="description">
                    Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Décrivez le fonctionnement de ce service…"
                    rows={4}
                    className={`w-full text-sm px-3 py-2.5 rounded-lg border bg-sidebar text-gray-900 placeholder-gray-300 outline-none transition-colors resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 ${errors.description ? "border-red-300 focus:ring-red-100 focus:border-red-400" : "border-gray-200"
                        }`}
                />
                <div className="flex items-center justify-between">
                    {errors.description ? (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M6 4v2.5M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            {errors.description}
                        </p>
                    ) : (
                        <span />
                    )}
                    <span className="text-xs text-gray-300 ml-auto">
                        {form.description.length} chars
                    </span>
                </div>
            </div>

            {/* isActive toggle */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                    <p className="text-sm font-medium text-gray-700">Statut actif</p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={form.isActive}
                    onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0 ${form.isActive
                        ? "bg-chart-1 focus:ring-blue-300"
                        : "bg-gray-200 focus:ring-gray-300"
                        }`}
                >
                    <span
                        className={`absolute top-1 w-4 h-4 bg-background rounded-full shadow-sm transition-transform duration-200 ${form.isActive ? "translate-x-1" : "-translate-x-5"
                            }`}
                    />
                </button>
            </div>

            {/* Actions */}
            <div className="flex mt-7 items-center gap-3">
                <button
                    type="button"
                    disabled={Loading}
                    onClick={handleSubmit}
                    className="flex-1 text-sm font-medium text-white bg-chart-1 hover:bg-blue-600 active:scale-95 px-4 py-2.5 rounded-lg transition-all duration-150 flex items-center justify-center gap-2"
                >
                    {
                        Loading
                            ? <Loader1 />
                            : <Plus />
                    }
                    Créer la division
                </button>
            </div>
        </Dialog>
    );
}