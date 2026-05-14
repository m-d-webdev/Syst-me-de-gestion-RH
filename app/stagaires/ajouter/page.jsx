"use client";

import { generateTempPassword } from "@/lib/utils";
import { useEffect, useState } from "react";
import Select2 from "@/components/ui/select2"
import Loader1 from "@/components/Global/Loader1";
import { GET_DIVISIONS } from "@/api/Division";
import { GET_SERVICES } from "@/api/Service";
import { FetchGrads } from "@/api/Employers/User";
import { AJOUTER_STAGAIRE } from "@/api/Employers/Stagiare";
import CheckBoxinput from "@/components/ui/CheckBoxinput";

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
    const [form, setForm] = useState(
        {
            name: null,
            ar_name: null,
            email: null,
            cin: null,
            phone: null,
            num_demand: null,
            start_date: null,
            end_date: null,
            division_id: null,
            service_id: null,
            gender: null,
            isActive: true,
        }
    );


    const [listOfDivisions, setlistOfDivisions] = useState([]);
    const [listOfServices, setlistOfServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [LoadingServices, setLoadingServices] = useState(false);

    const [isLoadingExistingRalted, setLoadingExistingRalted] = useState(true)

    const handleLoadNeedDataToRegister = async () => {
        const divisionsreq = await GET_DIVISIONS();

        setlistOfDivisions(divisionsreq.data.map(e => (
            {
                value: e._id,
                innerText: e.name
            }
        )));

        setLoadingExistingRalted(false);


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

    };

    useEffect(() => { handleLoadNeedDataToRegister() }, [])


    const handleChange = (field) => (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleChange2 = (key, v) => {
        setForm((prev) => ({ ...prev, [key]: v }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        const res = await AJOUTER_STAGAIRE({ data: form });
        if (res.success) { window.location.href = "/stagaires" };

        setIsLoading(false);
    };

    const initials = `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex w-full  justify-center items-center ">
            {
                isLoadingExistingRalted
                    ? <Loader1 />
                    : <div className="w-full max-w-[1200] grid  bg-background items-end  grid-cols-1 xl:grid-cols-2 p-6 gap-10">
                        <div className="w-full  rounded-2xl ">
                            <div className="bg-foreground rounded-xl px-8 py-6 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-yellow-300 flex items-center justify-center font-mono font-semibold text-lg text-[#1a1a2e] flex-shrink-0">
                                    {initials}
                                </div>
                                <div>
                                    <h2 className="text-background text-xl font-semibold tracking-tight">Créer un nouvel Stagaire</h2>
                                    <p className="text-background/50 text-sm mt-0.5">Remplissez les champs ci-dessous pour créer le compte</p>
                                </div>
                            </div>

                            {/* Personal info */}
                            <SectionLabel></SectionLabel>
                            <FieldGroup label="Numero de demand">
                                <Input
                                    type="text"
                                    value={form.num_demand}
                                    onChange={handleChange("num_demand")}
                                    placeholder="num demand"
                                />
                            </FieldGroup>
                            <SectionLabel>Informations personnelles</SectionLabel>
                            <FieldGroup label="Nom complet (Nom → Prénom)">
                                <Input
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    placeholder="Nom complet "
                                />
                            </FieldGroup>
                            <hr className="border-gray-100 my-1" />
                            <FieldGroup label="الاسم الكامل (النسب ← الاسم الشخصي)">
                                <Input
                                    type="text"
                                    value={form.ar_name}
                                    onChange={handleChange("ar_name")}
                                    placeholder="الاسم الكامل"
                                />
                            </FieldGroup>
                            <hr className="border-gray-100 my-2" />
                            <FieldGroup label="C.I.N">
                                <Input
                                    type="text"
                                    value={form.cin}
                                    onChange={handleChange("cin")}
                                    placeholder="JH0000"
                                />
                            </FieldGroup>
                            <hr className="border-gray-100 my-2" />
                            <FieldGroup label={"Genre"} >
                                <div className="flex gap-2 items-center">

                                    <CheckBoxinput
                                        checked={form.gender == "female"}
                                        onClick={() => handleChange2("gender", "female")}

                                    />
                                    <p
                                        onClick={() => handleChange2("gender", "female")}
                                        className="text-sm">
                                        Féminin
                                    </p>

                                </div>
                                <div className="flex gap-2 items-center">
                                    <CheckBoxinput
                                        checked={form.gender == "male"}
                                        onClick={() => handleChange2("gender", "male")}
                                    />
                                    <p
                                        onClick={() => handleChange2("gender", "male")}
                                        className="text-sm">Masculin</p>
                                </div>

                            </FieldGroup>
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
                                        label="Division"
                                        icon={<i className="bi bi-building"></i>}
                                        list={listOfDivisions}
                                        onChange={v => {
                                            handleChange2("division_id", v);
                                            HandleGetServices({ division_id: v });
                                        }}
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
                                    <FieldGroup label="Date de debut">
                                        <Input
                                            type="date"
                                            className="max-w-[400]"
                                            onChange={handleChange("start_date")}
                                            placeholder="Prénom"
                                        />
                                    </FieldGroup>
                                    <FieldGroup label="Date de fin">
                                        <Input
                                            type="date"
                                            minDate={form.start_date}
                                            className="max-w-[400]"
                                            onChange={handleChange("end_date")}
                                            placeholder="Prénom"
                                        />
                                    </FieldGroup>

                                </div>

                                <hr className="border-gray-100 my-5" />
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
            }

        </div >

    );
}