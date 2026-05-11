"use client";

import { generateTempPassword } from "@/lib/utils";
import { useEffect, useState } from "react";
import Select2 from "@/components/ui/select2"
import Loader1 from "@/components/Global/Loader1";
import { REGISTER } from "@/api/Employers/Auth";
import { GET_DIVISIONS } from "@/api/Division";
import { GET_SERVICES } from "@/api/Service";
import { FetchGrads } from "@/api/Employers/User";
const defaultValues = {
    firstName: "",
    lastName: "",
    email: "@gmail.com",
    password: "",
    phone: "+2126",
    division_id: "",
    service_id: "",
    grade_id: "",
    role: "user",
    isActive: true,
};
function SectionLabel({ children }) {
    return (
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-3 mt-6 first:mt-0">
            {children}
        </p>
    );
}

function FieldGroup({ label, children, hint }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">{label}</label>
            {children}
            {hint && <span className="font-mono text-[11px] text-gray-400">{hint}</span>}
        </div>
    );
}

function Input({ className = "", ...props }) {
    return (
        <input
            className={`w-full h-10 px-3 rounded-lg border border-gray-200 bg-sidebar/30 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition ${className}`}
            {...props}
        />
    );
}

export default function RegisterUser() {
    const [form, setForm] = useState({});

    const [listOfDivisions, setlistOfDivisions] = useState([]);

    const [listOfServices, setlistOfServices] = useState([]);
    const [listOfGrades, setlistOfGrades] = useState();

    const [listOfRoles, setlistOfRoles] = useState([
        { value: "admin", innerText: "Administrateur" },
        { value: "hr_agent", innerText: "Agent RH" },
        { value: "chef_service", innerText: "Chef de service" },
        { value: "chef_division", innerText: "Chef de division" },
        { value: "employee", innerText: "Employé" },
    ]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [LoadingServices, setLoadingServices] = useState(false);

    const [isLoadingExistingRalted, setLoadingExistingRalted] = useState(true)

    const handleLoadNeedDataToRegister = async () => {
        const divisionsreq = await GET_DIVISIONS();
        let gradesRes = await FetchGrads();
        setlistOfGrades(gradesRes?.data?.map(element => ({ innerText: element.name, value: element._id })))

        setlistOfDivisions(divisionsreq.data.map(e => (
            {
                value: e._id,
                innerText: e.name
            }
        )));

        setLoadingExistingRalted(false)
    };

    const HandleGetServices = async ({ division_id }) => {
        setLoadingServices(true);

        handleChange2("service_id", null);

        const res = await GET_SERVICES({ division_id });

        setlistOfServices(res.data?.map(e => (
            {
                value: e._id,
                innerText: e.name
            }
        )));


        setLoadingServices(false)

    }
    useEffect(() => {
        handleLoadNeedDataToRegister()
    }, [])


    const handleChange = (field) => (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleChange2 = (key, v) => {
        setForm((prev) => ({ ...prev, [key]: v }));
    };

    const handleSubmit = async () => {
        console.log("Submitting:", form);
        setIsLoading(true)
        const res = await REGISTER({ data: form });
        if (res.success) {

            window.location.reload();

        }
        setIsLoading(false)
        // alert("User registered!\n" + JSON.stringify(form, null, 2));
    };

    const initials = `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex w-full  justify-center items-center ">

            <div className="w-full max-w-[1200] grid  bg-background items-end  grid-cols-1 xl:grid-cols-2 p-6 gap-10">
                <div className="w-full  rounded-2xl ">
                    <div className="bg-foreground rounded-xl px-8 py-6 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-yellow-300 flex items-center justify-center font-mono font-semibold text-lg text-[#1a1a2e] flex-shrink-0">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-background text-xl font-semibold tracking-tight">Créer un nouvel utilisateur</h2>
                            <p className="text-background/50 text-sm mt-0.5">Remplissez les champs ci-dessous pour créer le compte</p>
                        </div>
                    </div>

                    {/* Personal info */}
                    <SectionLabel>Informations personnelles</SectionLabel>
                    <div className="grid grid-cols-2 gap-3">
                        <FieldGroup label="Prénom">
                            <Input
                                type="text"
                                value={form.firstName}
                                onChange={handleChange("firstName")}
                                placeholder="Prénom"
                            />
                        </FieldGroup>
                        <FieldGroup label="Nom">
                            <Input
                                type="text"
                                value={form.lastName}
                                onChange={handleChange("lastName")}
                                placeholder="Nom"
                            />
                        </FieldGroup>
                    </div>



                    <hr className="border-gray-100 my-5" />

                    {/* Contact */}
                    <SectionLabel>Contact</SectionLabel>
                    <div className="flex flex-col gap-3">
                        <FieldGroup label="Adresse e-mail">
                            <Input
                                type="email"
                                value={form.email}
                                onChange={handleChange("email")}
                                placeholder="Adresse e-mail"
                            />
                        </FieldGroup>
                        <FieldGroup label="Numéro de téléphone">
                            <Input
                                type="tel"
                                value={form.phone}
                                onChange={handleChange("phone")}
                                placeholder="+212600000000"
                            />
                        </FieldGroup>
                    </div>

                    <hr className="border-gray-100 my-5" />

                    {/* Security */}
                    <SectionLabel>Sécurité</SectionLabel>
                    <FieldGroup label="Mot de passe (hash bcrypt)">

                        <div className="flex w-full gap-2 items-center">

                            <Input
                                type="text"
                                value={form.password}
                                onChange={handleChange("password")}
                                className="font-mono text-xs tracking-wide"
                                placeholder="$2b$12$..."
                            />
                            <button
                                onClick={() =>
                                    setForm((prev) => ({ ...prev, "password": generateTempPassword() }))

                                }
                                className="bg-chart-1 flex text-nowrap gap-2 items-center p-2 rounded-md text-sm opacity-60 hover:opacity-100 text-white">
                                <i className="bi bi-gear"></i>
                                auto-généré
                            </button>
                        </div>
                    </FieldGroup>

                </div>
                <div className="w-full">
                    {/* Body */}
                    <div className="px-8 py-6">


                        <hr className="border-gray-100 my-5" />

                        {/* Organisation */}
                        <SectionLabel>Organisation</SectionLabel>
                        <div className="flex flex-col gap-4">
                            <Select2
                                type="text"
                                label="Role"
                                icon={<i className="bi bi-person"></i>}
                                list={listOfRoles}
                                onChange={v => handleChange2("role", v)}
                                parentClassName=" bg-sidebar/30"
                                placeholder="ObjectId de la division"
                            />
                            <Select2
                                type="text"
                                label="Division"
                                icon={<i className="bi bi-building"></i>}
                                list={listOfDivisions}
                                onChange={v => {
                                    handleChange2("division_id", v);
                                    HandleGetServices({ division_id: v });
                                }
                                }
                                className="font-mono text-xs"
                                placeholder="ObjectId de la division"
                            />
                            <div className="w-full relative">
                                {
                                    LoadingServices &&
                                    <div className="w-full absolute z-[2] h-full flex justify-center items-center"><Loader1 className="before:border-foreground" /> </div>
                                }

                                <Select2
                                    disabled={form.role == "chef_division"}
                                    type="text"
                                    label="Service"
                                    icon={<i className="bi bi-align-top"></i>}
                                    list={listOfServices}
                                    onChange={v => handleChange2("service_id", v)}
                                    className="font-mono text-xs"
                                    placeholder="ObjectId de la division"
                                />
                            </div>
                            <Select2
                                type="text"
                                label="Grade"
                                icon={<i className="bi bi-mortarboard"></i>}
                                list={listOfGrades}
                                onChange={v => handleChange2("grade_id", v)}
                                className="font-mono text-xs"
                                placeholder="ObjectId de la division"
                            />

                        </div>

                        <hr className="border-gray-100 my-5" />

                        {/* Account status */}
                        <SectionLabel>Statut du compte</SectionLabel>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 flex-1">Le compte est actif</span>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={handleChange("isActive")}
                                    className="w-4 h-4 accent-indigo-500"
                                />
                                <span className="text-xs text-gray-500">Actif</span>
                            </label>
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-800">
                                {form.role}
                            </span>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 border-t  flex items-center justify-center">

                        <button
                            onClick={handleSubmit}
                            disabled={isLoadingExistingRalted || isLoading}
                            className="h-9 px-5  gap-4 flex items-center justify-center py-6 rounded-lg bg-foreground w-full max-w-[400] text-background text-sm font-medium hover:opacity-85 transition-opacity"
                        >
                            {
                                isLoading
                                    ? <Loader1 className="" />
                                    : <i className="bi bi-check-circle"></i>
                            }
                            Créer l'utilisateur

                        </button>
                    </div>
                </div>
            </div >
        </div >

    );
}