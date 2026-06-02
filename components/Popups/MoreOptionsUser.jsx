"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";
import { ChevronRight, File, MoveRight, ReceiptText, Trash2 } from "lucide-react";
import { COPY_TEXT } from "@/lib/utils";
import Loader1 from "../Global/Loader1";
import EmployeeAttendance from "@/app/attendance/(COMPS)/attendanceCalenda";
import EmployeePopup from "../Global/UserData";
import { decision_de_stage_url, demande_explication, exporter_data } from "@/api/DOCUMENTS";
import { DELETE_USER } from "@/api/Employers/User";
import SecureButton from "../SecureButton";
import Dialog from "../Global/Dialog";
import Calendar from "../ui/calendar";

const ARABIC_MONTHS = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
    'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'
];

const MoreOptionsUser = ({ data, onDelete }) => {

    const [isDocumentMenuOpen, setDocumentMenuOpen] = useState(false);
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
                            <button
                                className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-2 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
                                onClick={() => setDocumentMenuOpen(true)}
                            >
                                <i className="bi bi-file-earmark-text"></i>
                                Documents
                            </button>


                            <Link href={`/users/${data._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <ReceiptText className="stroke-1 w-5 h-5" />
                                Détails de l’employé
                            </Link>

                            <Link href={`/register/${data._id}`} className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-1 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center ">
                                <i className="bi text-base w-5 bi-pen"></i>
                                Modifier
                            </Link>

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
            {
                isDocumentMenuOpen &&
                <DocumentsPopup _id={data._id} onClose={() => setDocumentMenuOpen(false)} />
            }
        </>
    )
}


export const DocumentsPopup = ({ _id, defaultDates, onClose }) => {
    const [selectDatesOpen, setselectDatesOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [SelectedDates, setSelectedDates] = useState(defaultDates ?? []);
    const CalendarDayRef = useRef();
    const handleClickOutside = (e) => {
        if (!CalendarDayRef.current?.contains(e.target)) {
            setCalendarOpen(false);
        }
    };

    useEffect(() => {
        if (!calendarOpen) return;
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [calendarOpen]);




    function formatDates(dates) {
        if (!dates || dates.length === 0) return '';

        // Parse and sort chronologically
        const parsed = dates.map(d => {
            const [day, month, year] = d.split('-').map(Number);
            return { day, month, year };
        });
        parsed.sort((a, b) => new Date(a.year, a.month - 1, a.day) - new Date(b.year, b.month - 1, b.day));

        // Group days by month-year
        const groups = {};
        parsed.forEach(({ day, month, year }) => {
            const key = `${month}-${year}`;
            if (!groups[key]) groups[key] = { month, year, days: [] };
            if (!groups[key].days.includes(day)) groups[key].days.push(day);
        });

        // Build sentence parts
        const parts = Object.values(groups).map(({ month, year, days }) => {
            const dayStrs = days.map(d => String(d).padStart(2, '0'));
            return `${dayStrs.join(', ')} ${ARABIC_MONTHS[month - 1]} ${year}`;
        });
        let preFinalRes = parts.join(' و ')
        return preFinalRes
    }


    return (
        <>

            <Dialog
                onClose={onClose}
                closeIfClickOutside={true}
                containerClassName="grid w-[500] min-h-[300] !bg-sidebare gap-3 grid-cols-3 p-4 py-8">

                <div className="w-full col-span-3 text-left mb-4 text-lg font-semibold">
                    Documents
                </div>

                <SecureButton
                    urlToAddToken={exporter_data(_id)}
                    className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
                >
                    <File />
                    Exporter les données
                </SecureButton>
                <div className="relative">

                    <button
                        urlToAddToken={demande_explication(_id)}
                        onClick={() => setselectDatesOpen(true)}
                        className="flex  bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
                    >
                        <File />
                        explication d'absence
                    </button>


                </div>

            </Dialog>

            <AnimatePresence>
                {
                    selectDatesOpen &&
                    <Dialog
                        backWhenClose={false}
                        onClose={() => setselectDatesOpen(false)}
                        containerClassName="w-[450] p-3 px-4 bg-sidebare justify-between flex flex-col h-[400] "

                    >
                        <div className="">

                            <h1 className="text-md mb-10 text-left font-semibold tracking-tight ">Jours d'absence</h1>
                            <div className="w-full flex justify-end">
                                <button onClick={() => setSelectedDates([])} className="flex p-2 text-xs bg-accent gap-2 items-center border border-foreground/10 rounded-md ">
                                    Effacer
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                            <h2 className="font-medium " dir="rtl">
                                {formatDates(SelectedDates)}
                            </h2>
                            <button onClick={() => setCalendarOpen(true)} className="w-full mt-8 bg-accent justify-center p-2 flex items-center gap-2 rounded-md  border border-dashed border-foreground/50">
                                <i className="bi bi-calendar-plus"></i>
                                Ajouter Un jour
                            </button>
                        </div>

                        <SecureButton
                            disabled={SelectedDates.length == 0}
                            alreadyContainVar={true}
                            urlToAddToken={demande_explication(_id, formatDates(SelectedDates))}
                            className="flex justify-center bg-background mt-10  border-foreground/20 text-wrap w-full p-2 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
                        >


                            Générer
                            <MoveRight />
                        </SecureButton>

                        <AnimatePresence>
                            {calendarOpen &&
                                <motion.div
                                    ref={CalendarDayRef}
                                    initial={{ opacity: 0, scale: 0.95, }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut", }}
                                    className="absolute z-2 w-[300]  right-[16%] top-[5%]  shadow-lg rounded-lg  overflow-hidden"
                                >
                                    <Calendar
                                        classNames={""}
                                        locale={"fr"}
                                        onSelect={d => {
                                            setSelectedDates(pv => [...pv, d])
                                            setCalendarOpen(false)
                                        }}
                                    />
                                </motion.div>
                            }
                        </AnimatePresence>
                    </Dialog>
                }
            </AnimatePresence>
        </>
    )

}
export default MoreOptionsUser
