"use client";

import { GET_SERVICES } from "@/api/Service";
import { useEffect, useState } from "react";
import ServicesCard, { ServicesCardSkeleton } from "./cards&loadingCards/ServicesCard";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import NoResult from "./Lotties/no_result";
import CreateServiceForm from "./Popups/CreateService";


const ServicesPage = ({ division_id }) => {

    const [services, setData] = useState([]);
    const [Loading, setisLoading] = useState(true);
    const [divisionName, setDivisionName] = useState();

    const [isAddPopupOpen, setAddPopupOpen] = useState(false);

    const getServices = async () => {
        setisLoading(true)
        const res = await GET_SERVICES({ division_id });
        setData(res.data)
        setDivisionName(res.data[0]?.division_id?.name)
        setisLoading(false)
    };


    useEffect(() => {
        getServices()
    }, []);


    return (
        <div className="px-6 w-full  py-10">
            <div className=" mx-auto w-full max-w-[1200]">
                {/* Page header */}
                <div className="mb-8 flex items-center justify-between w-full ">
                    <h1 className="text-xl flex gap-2 font-semibold items-center  "><i className="bi bi-buildings-fill"></i> {divisionName && <span className="text-sm">{divisionName} / </span>} Services</h1>
                    <Button onClick={() => setAddPopupOpen(true)}><Plus /> Créer une service</Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Loading
                        ? [1, 1, 1, 1, 1].map((i, ind) => <ServicesCardSkeleton ind={ind} />)
                        : services?.length > 0 ? services?.map((service) => (
                            <ServicesCard key={service.id} service={service} division_id={division_id} onToggle={() => { }} />
                        ))
                            : <div className=" w-full p-5 mt-10 h-full col-span-4 flex flex-col items-center justify-center text-center">
                                <NoResult />
                                <p className="font-medium tracking-tight mt-2"> Aucun service associé</p>
                            </div>
                    }
                </div>
            </div>
            {
                isAddPopupOpen &&
                <CreateServiceForm onUpdate={() => {
                    setAddPopupOpen(false)
                    getServices()
                }
                } division_id={division_id} onClose={() => setAddPopupOpen(false)} />
            }
        </div>
    )
}
export default ServicesPage
