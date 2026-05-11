"use client";

import { GET_USER } from "@/api/Employers/User";
import Dialog from "./Dialog";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import Loader1 from "./Loader1";
import { DivisionICON, getRoleLabel, ServiceICON, UserPic } from "@/lib/utils";
import { BriefcaseBusiness, CardSim, Mail, Phone, User, X } from "lucide-react";
import CopyContainer from "./CopyContainer";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";


const OptionsMenu = ({ onClose, data }) => {
    const PageRef = useRef();
    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target)) {
            onClose()
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <motion.div
            ref={PageRef}
            initial={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute p-2  right-0 top-0  z-10  bg-background shadow-sm rounded-sm rounded-tr-none border overflow-hidden"
        >
            <Link href={`/attendance/${data}`} className="flex p-1 gap-2 opacity-70 hover:opacity-100 duration-200 px-2 font-medium text-sm text-nowrap border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                <i className="bi bi-calendar2-range"></i>
                Historique des présences
            </Link>
            <Link href={`/attendance/${data}`} className="flex p-1 gap-2 opacity-70 hover:opacity-100 duration-200 px-2 font-medium text-sm text-nowrap border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                <i className="bi bi-calendar2-range"></i>
            </Link>
            <Link href={`/attendance/${data}`} className="flex p-1 gap-2 opacity-70 hover:opacity-100 duration-200 px-2 font-medium text-sm text-nowrap border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                <i className="bi bi-calendar2-range"></i>
            </Link>
            <Link href={`/attendance/${data}`} className="flex p-1 gap-2 opacity-70 hover:opacity-100 duration-200 px-2 font-medium text-sm text-nowrap border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                <i className="bi bi-calendar2-range"></i>
            </Link>
        </motion.div>
    )
}

export default function EmployeePopup({ id }) {
    const [Loading, setLoading] = useState(true)
    const [userData, setuserData] = useState(null)
    const [isOpen, setisOpen] = useState(false)
    const [UserNotFound, setUserNotFound] = useState(false)
    const GetUser = async () => {
        setLoading(true);
        const res = await GET_USER({ id });
        if (!res.data) {
            setUserNotFound(true)
        } else {
            setuserData(res.data)
            setUserNotFound(false)
        }
        setLoading(false)
    };
    useEffect(() => {
        GetUser()
    }, [])
    const Router = useRouter()
    return (
        <Dialog backWhenClose={true} containerClassName="!p-0 !min-h-[450] !bg-background  md:w-[700]" >
            {/* Actions */}
            {
                Loading ?
                    <div className="w-full h-[350] flex items-center justify-center">
                        <Loader1 className=" before:border-foreground" wh="w-[30] h-[30]" />
                    </div>
                    :
                    <>
                        <div
                            className="w-full z-[1] h-[80] top-0 right-0 inset-0"
                            style={{
                                background: "linear-gradient(135deg, #f97316 0%, #fb923c 20%, #fbbf24 35%, #34d399 55%, #22d3ee 75%, #60a5fa 100%)",
                            }}
                        />
                        <div className="w-full p-5 px-3 h-full absolute top-0 pt-[50]  z-[2] right-0">
                            <Button variant="ghost" onClick={() => Router.back()} className={"absolute top-1 right-2"}>
                                <X className="w-5 h-5" />
                            </Button>
                            <div className="w-full  flex  items-start justify-between">
                                <div className="p-[4] border border-foreground/10 rounded-full bg-background">
                                    <img src={UserPic()} className="w-[100] h-[100] rounded-full object-top object-cover" alt="" />
                                </div>
                              
                                <div className="relative mt-10">
                                    <button
                                        onClick={() => setisOpen(true)}
                                        title="Options"
                                        className="flex  group flex-col items-center gap-1 bg-sidebar rounded-md "
                                    >

                                        <p className="opacity-0 scale-0 group-hover:scale-100 absolute top-6 right-0  group-hover:opacity-100  bg-foreground text-background text-xs  p-1 px-2 rounded-xl duration-150">Options</p>
                                        <i className="bi text-sm  bi-columns-gap"></i>

                                    </button>
                                    <AnimatePresence>
                                        {
                                            isOpen &&
                                            <OptionsMenu onClose={() => setisOpen(false)} />
                                        }
                                    </AnimatePresence>
                                </div>
                            </div>
                            
                            <div className="w-full flex items-center  gap-6">
                                <h1 className="font-semibold text-lg tracking-tighter">M. {userData.firstName} {userData.lastName}</h1>
                                <p className="opacity-70 font-medium tracking-tighter flex gap-1   text-sm items-start"><User className="w-4 h-4" /> {getRoleLabel(userData.role)}</p>
                            </div>

                            <div className="w-full flex mt-3 gap-2 justify-ensd items-center">
                                <CopyContainer
                                    icon={<i className="bi bi-person-vcard"></i>}
                                    text={"JB6688"}
                                />
                                <CopyContainer
                                    icon={<Phone className="w-4 h-4 strok-1" />}
                                    text={userData.phone}
                                />
                                <div className="flex gap-2 ml-4 mt-s10 items-center">
                                    <CopyContainer
                                        icon={<Mail className="w-4 h-4 strok-1" />}
                                        text={userData.email}
                                    />
                                    <a target="_blank" className="bg-foreground text-xs tracking-tight text-background p-2 px-s rounded-sm" href={`mailto:${userData.email}`}>
                                        Envoyer email
                                    </a>
                                </div>
                            </div>

                            <div className="mt-10 gap-5 grid px-5 grid-cols-3">
                                <div className="text-sm  w-full tracking-tight flex flex-col opacity-80 items-center justify-start text-center gap-2  p-2 px-2 bg-chart-1/5 rounded-md border border-chart-1/50">
                                    <div className="flex text-chart-1 items-end gap-2 w-full  ">
                                        <i className="bi bi-buildings text-xl"  ></i>
                                        <p>Division</p>
                                    </div>
                                    <span className="">
                                        {userData.division_id?.name}
                                    </span>
                                </div>
                                <div className="text-sm  w-full tracking-tight flex flex-col opacity-80 items-center justify-start text-center gap-2  p-2 px-2 bg-chart-1/5 rounded-md border border-chart-1/50">
                                    <div className="flex text-chart-1  items-end gap-2 w-full  ">
                                        <ServiceICON className="w-6 !min-w64 min stroke-1  h-6 " />
                                        <p>Service</p>
                                    </div>
                                    {userData.service_id?.name}</div>
                                <div className="text-sm  w-full tracking-tight flex flex-col opacity-80 items-center justify-start text-center gap-2  p-2 px-2 bg-chart-1/5 rounded-md border border-chart-1/50">
                                    <div className="flex text-chart-1  items-end gap-2 w-full  ">
                                        <BriefcaseBusiness className="w-6 !min-w-6 min stroke-1  h-6 " />
                                        <p>Grade</p>
                                    </div>
                                    <span className="">
                                        {userData.grade_id?.name ?? "Aucun"}
                                    </span>
                                </div>
                            </div>
                        </div>


                    </>
            }
        </Dialog >
    );
}