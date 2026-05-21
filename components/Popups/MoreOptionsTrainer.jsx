"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link";

import { COPY_TEXT } from "@/lib/utils";

import { attestation_de_reception, attestation_de_stage_url, decision_de_stage_url, engagement_de_stage_url, Notification_de_fin_de_stage_url } from "@/api/DOCUMENTS";
import Dialog from "../Global/Dialog";


const DocumentsPopup = ({ _id, onClose }) => {

    return (
        <Dialog
            onClose={onClose}
            closeIfClickOutside={true}
            containerClassName="grid w-[450] !bg-sidebare gap-3 grid-cols-3 p-4 py-8">
            <div className="w-full col-span-3 text-left mb-4 text-lg font-semibold">
                Documents
            </div>
            <a
                target="_blank" href={`${decision_de_stage_url(_id, "fr")}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i className="bi text-3xl bi-file-earmark-text"></i>
                Decision de stage francais
            </a>

            <a
                target="_blank" href={`${decision_de_stage_url(_id, "ar")}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i className="bi text-3xl bi-file-pdf"></i>
                Decision de stage arabic
            </a>
            <a
                target="_blank" href={`${attestation_de_stage_url(_id)}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i class="bi text-3xl bi-file-earmark-medical"></i>
                Attestation de stage
            </a>
            <a
                target="_blank" href={`${Notification_de_fin_de_stage_url(_id)}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i class="bi text-3xl bi-file-earmark-medical"></i>
                Notification de fin de stage
            </a>
            <a
                target="_blank" href={`${engagement_de_stage_url(_id)}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i class="bi text-3xl bi-file-earmark-medical"></i>
                Engagement
            </a>
            <a
                target="_blank" href={`${attestation_de_reception(_id)}`}
                className="flex bg-background  border-foreground/20 text-wrap w-full p-2 flex-col opacity-70 hover:opacity-100 duration-200 font-medium gap-2 border  hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
            >
                <i class="bi text-3xl bi-file-earmark-medical"></i>
                Attestation de réception
            </a>
        </Dialog>
    )

}


const MoreOptionsTrainer = ({ data }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [DocumentMenuOpen, setDocumentMenuOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const PageRef = useRef();


    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target) && DocumentMenuOpen == false) {
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
                            <button
                                className="flex p-1 opacity-70 hover:opacity-100 duration-200 px-2 font-medium gap-2 border border-transparent hover:border-foreground/20 rounded-md hover:bg-primary-foreground items-center "
                                onClick={() => setDocumentMenuOpen(true)}
                            >
                                <i className="bi bi-file-earmark-text"></i>
                                Documents
                            </button>

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
            </div>
            {
                DocumentMenuOpen &&
                <DocumentsPopup onClose={() => setDocumentMenuOpen(false)}
                    _id={data._id}
                />
            }
        </>
    )
}

export default MoreOptionsTrainer
