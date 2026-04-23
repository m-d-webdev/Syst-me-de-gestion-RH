"use client"

import Link from "next/link";
import Logo from "../Global/Logo"
import { sidebarLinks } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ListLinks = ({ isOpen = true }) => {
    const pathname = usePathname();
    return (
        <div className="w-full mt-10 flex flex-col gap-2  items-start ">
            {sidebarLinks.map((link) => (
                <Link key={link.name} href={link.href} className={`duration-200 ease-in-out flex items-center tracking-tight  gap-2 border w-full p-1 px-2 ${isOpen ? "" : "justify-center"}  rounded-md ${pathname == link.href ? "font-semibold opacity-100 text-chart-1 border-chart-1/40 bg-sidebar " : "font-light  text-sm  opacity-65 hover:opacity-90 hover:border-foreground/25"} `}>
                    {pathname == link.href ? link.iconOn : link.icon}
                    {
                        isOpen &&
                        link.name
                    }
                </Link>
            ))}
        </div>
    )
}


const Sidebare = ({ }) => {
    const [isOpen, setOpen] = useState(true)
    const handleChaneOpen = () => {
        setOpen(pv => !pv)
    }
    return (
        <div className={` relative duration-200 bg-background max-h-screen overflow-auto scrl_none ${isOpen ? "p-3 px-4 w-[250]" : "w-[50] p-1"}`}>
            <div className="w-full flex justify-center items-center">

                <Logo isOpen={isOpen} />
            </div>
            <ListLinks isOpen={isOpen} />
            <Link target="_blank" href={"/report-problem"} className="w-full text-sm mt-7 p-2 bg-accent rounded-md border border-foreground/20 flex items-center justify-center gap-2">
                <i className="bi text-md bi-headset"></i>
                {
                    isOpen &&
                    <p className="duration-200">Signaler problème</p>
                }
            </Link>
            <div onClick={handleChaneOpen} className="absolute top-0 right-[-2] w-[5] h-full   cursor-e-resize"></div>
        </div>
    )
}

export default Sidebare
