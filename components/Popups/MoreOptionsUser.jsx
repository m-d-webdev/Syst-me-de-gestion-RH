"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { File, ReceiptText, Trash2 } from "lucide-react";
import { COPY_TEXT } from "@/lib/utils";
import Loader1 from "../Global/Loader1";
import EmployeeAttendance from "@/app/attendance/(COMPS)/attendanceCalenda";
import EmployeePopup from "../Global/UserData";
import { decision_de_stage_url, demande_explication } from "@/api/DOCUMENTS";
import { DELETE_USER } from "@/api/Employers/User";

const MoreOptionsUser = ({ data,onDelete }) => {

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

    const handleDelet = async () => {
        setDeleting(true)
        await DELETE_USER({ id: data._id })
        setDeleting(false);
        setMenuOpen(false)
        onDelete()
    }
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
                            <a target="_blank" href={demande_explication(data._id)} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <File />
                                demande d'explication
                            </a>
                            <Link href={`/users/${data._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <ReceiptText className="stroke-1 w-5 h-5" />
                                Détails de l’employé
                            </Link>

                            <Link href={`/register/${data._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
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
                            <button onClick={handleDelet} className="flex gap-2  text-red-500 bg-red-500/15 border border-red-500/600 p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-semibold  rounded-md hover:bg-primary-foreground items-center ">
                                {
                                    isDeleting
                                        ? <Loader1 className="before:border-red-500" wh="w-[15] h-[15]" />
                                        : <i className="bi bi-trash"></i>
                                }
                                Supprimer
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

export default MoreOptionsUser
