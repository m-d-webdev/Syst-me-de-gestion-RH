"use client";



import { useState, useEffect } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import Dialog from "../Global/Dialog";
import Select2 from "../ui/select2";
import { GET_DIVISIONS } from "@/api/Division";
import { GET_SERVICES } from "@/api/Service";
import Loader1 from "../Global/Loader1";
import { Button } from "../ui/button";
import { FetchGrads } from "@/api/Employers/User";
const ROLES = [
    { value: "admin", label: "Admin" },
    { value: "hr_agent", label: "HR Agent" },
    { value: "chef_division", label: "Chef Division" },
    { value: "chef_service", label: "Chef Service" },
    { value: "employee", label: "Employee" },
];

const ROLE_COLORS = {
    admin: "bg-violet-100 text-violet-800",
    hr_agent: "bg-blue-100 text-blue-800",
    chef_division: "bg-amber-100 text-amber-800",
    chef_service: "bg-teal-100 text-teal-800",
    employee: "bg-slate-100 text-slate-700",
};

export default function UsersFilter({
    filters = {},
    setFilters,
    onClose
}) {
    const [services, setServices] = useState([])
    const [divisions, setDivisions] = useState([]);
    const [gradeOptions, setGradeOptions] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const activeCount = Object.values(filters).filter(Boolean).length;
    const getSetviceAndDevision = async () => {
        setLoading(true);

        let divRes = await GET_DIVISIONS()
        let servRes = await GET_SERVICES()
        let gradesRes = await FetchGrads()
        setDivisions(divRes.data)
        setServices(servRes.data);
        setGradeOptions(gradesRes?.data?.map(element => ({ innerText: element.name, value: element._id })))
        setLoading(false)
    };

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value || null,
            ...(key === "division_id" ? { service_id: null } : {}),
        }));
    };

    const clearAll = () => {
        setFilters((prev) =>
            Object.fromEntries(Object.keys(prev).map((k) => [k, null]))
        );
    };

    const filteredServices = filters.division_id
        ? services.filter((s) => s.division_id === filters.division_id)
        : services;



    const divisionOptions = divisions.map((d) => ({ value: d._id, innerText: d.name }));

    const serviceOptions = filteredServices.map((s) => ({ value: s._id, innerText: s.name }));
    const roleOptions = ROLES.map((r) => ({ value: r.value, innerText: r.label }));


    useEffect(() => {
        getSetviceAndDevision()
    }, []);



    return (
        <Dialog closeIfClickOutside={true} onClose={onClose} backWhenClose={false} containerClassName="w-[350] p-4 flex flex-col justify-between bg-background relative h-[400] ">
            {
                isLoading && <div className="w-full z-[2] absolute h-full bg-foreground/15 top-0 right-0 flex justify-center items-center">
                    <Loader1 className="before:border-foreground" />
                </div>
            }
            <div className="flex flex-col gap-2" >
                {/* Header */}
                <div className="flex mb-5  items-center gap-1.5 pr-3  mr-1">
                    <i className="bi bi-funnel"></i>
                    <span className=" font-medium  ">Filtres</span>
                </div>

                {/* Role */}
                <Select2
                    label="Role"
                    icon={

                        filters.role ? (
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${ROLE_COLORS[filters.role]}`}>
                                {filters.role.split("_")[0]}
                            </span>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        )}

                    value={filters.role}
                    onChange={(v) => handleChange("role", v)}
                    list={roleOptions}
                    placeholder="All roles"
                />

                {/* Division */}
                <Select2
                    label="Division"
                    value={filters.division_id}
                    onChange={(v) => handleChange("division_id", v)}
                    list={divisionOptions}
                    placeholder="All divisions"
                    icon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        </svg>
                    }
                />

                {/* Service */}
                <Select2
                    label="Service"
                    value={filters.service_id}
                    onChange={(v) => handleChange("service_id", v)}
                    list={serviceOptions}
                    placeholder={filters.division_id ? "All services" : "Select division first"}
                    disabled={!filters.division_id && services.length > 0 && filteredServices.length !== services.length}
                    icon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    }
                />
                <Select2
                    label="Grade"
                    value={filters.grade_id}
                    onChange={(v) => handleChange("grade_id", v)}
                    list={gradeOptions}
                    icon={
                        <i className="bi bi-mortarboard"></i>
                    }
                />

                {/* Active filter chips */}
                {activeCount > 0 && (
                    <div className="flex mt-6 flex-wrap items-center gap-1.5 ml-auto">
                        {
                            filters.role && (
                                <span className={`flex text-nowrap items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${ROLE_COLORS[filters.role]}`}>
                                    {ROLES.find((r) => r.value === filters.role)?.label}
                                    <X size={11} className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => handleChange("role", null)} />
                                </span>
                            )
                        }

                        {filters.division_id && (
                            <span className="flex text-nowrap items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-amber-100 text-amber-800">
                                {divisions.find((d) => d._id === filters.division_id)?.name}
                                <X size={11} className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => handleChange("division_id", null)} />
                            </span>
                        )}

                        {filters.service_id && (
                            <span className="flex text-nowrap items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-teal-100 text-teal-800">
                                {services.find((s) => s._id === filters.service_id)?.name}
                                <X size={11} className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => handleChange("service_id", null)} />
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={clearAll}
                            className="ml-1 px-2.5 py-1 text-xs bg-sidebar p-2 rounded-lg transition-colors"
                        >
                            Réinitialiser
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full flex items-center justify-end">
                <Button onClick={onClose} >
                    Fermer
                </Button>
            </div>
        </Dialog>
    );
}