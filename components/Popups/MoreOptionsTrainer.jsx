"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { ReceiptText, Trash2 } from "lucide-react";
import { COPY_TEXT } from "@/lib/utils";
import Loader1 from "../Global/Loader1";
import EmployeeAttendance from "@/app/attendance/(COMPS)/attendanceCalenda";
import EmployeePopup from "../Global/UserData";
import { attestation_de_stage_url, decision_de_stage_url, Notification_de_fin_de_stage_url } from "@/api/DOCUMENTS";

const MoreOptionsTrainer = ({ data }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [UserDataOpen, setUserDataOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const PageRef = useRef();


    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target)) {
            setMenuOpen(false)
        }
    };

    useEffect(() => {
        if (!menuOpen) return;

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const [isDeactivating, setDeactivating] = useState(false)
    const [isFeaturing, setFeaturing] = useState(false)




    return (
        <>
            <div className="relative">
                <button onClick={() => setMenuOpen(pv => !pv)} className={"bg-background p-1 px-2 cursor-pointer border border-foreground/20 rounded-sm  z-[2]"}>
                    <i className="bi bi-layout-wtf"></i>
                </button>
                <AnimatePresence>

                    {
                        menuOpen &&
                        <motion.div
                            initial={{
                                scale: .7,
                                opacity: 0
                            }}
                            exit={{
                                scale: .7,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transformOrigin: "top right",
                                transition: {
                                    ease: "easeInOut",
                                    duration: .2
                                }
                            }}
                            ref={PageRef}
                            className="absolute drop-shadow-xl min-w-[150] flex flex-col gap-1 bg-background top-0 right-0 z-10 p-1 shadow-sm rounded-lg"
                        >

                            <a target="_blank" href={`${decision_de_stage_url(data._id)}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-2 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi bi-file-pdf"></i>
                                Decision de stage
                            </a>
                            <a target="_blank" href={`${attestation_de_stage_url(data._id)}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-2 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i class="bi bi-file-earmark-medical"></i>
                                Attestation de stage
                            </a>
                            <a target="_blank" href={`${Notification_de_fin_de_stage_url(data._id)}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-2 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i class="bi bi-file-earmark-medical"></i>
                                Notification de fin de stage

                            </a>
                            <Link href={`/`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-pen"></i>
                                Modifier
                            </Link>
                            <button onClick={() => COPY_TEXT(JSON.stringify(data))} className="flex p-1 opacity-70 gap-2 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi bi-file-earmark-arrow-up"></i>
                                Exporter
                            </button>
                            <button onClick={() => COPY_TEXT(JSON.stringify(data))} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-clipboard-check"></i>
                                Copier les informations
                            </button>
                        </motion.div>
                    }
                </AnimatePresence>
            </div >

            {UserDataOpen &&
                <EmployeePopup onClose={() => setUserDataOpen(false)} employee={data} />
            }
        </>
    )
}

export default MoreOptionsTrainer
