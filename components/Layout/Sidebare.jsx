"use client"

import Link from "next/link";
import Logo from "../Global/Logo"
import { sidebarLinks } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ListLinks = () => {
    const pathname = usePathname();
    return (
        <div className="w-full mt-10 flex flex-col gap-2  items-start ">
            {sidebarLinks.map((link) => (
                <Link key={link.name} href={link.href} className={`duration-200 ease-in-out flex items-center tracking-tight  gap-2 border w-full p-1 px-2  rounded-md ${pathname == link.href ? "font-medium opacity-100 text-chart-1 border-chart-1/40 bg-background " : "font-light   opacity-65 hover:opacity-90 hover:border-foreground/25"} `}>
                    {pathname == link.href ? link.iconOn : link.icon}
                    {link.name}
                </Link>
            ))}
        </div>
    )
}


const Sidebare = () => {
    return (
        <div className="w-full max-h-screen overflow-auto scrl_none p-3 px-4 ">
            <div className="w-full flex justify-center items-center">

                <Logo />
            </div>
            <ListLinks />
            <Link target="_blank" href={"/report-problem"} className="w-full text-sm mt-7 p-2 bg-accent rounded-md border border-foreground/20 flex items-center justify-center gap-2">
                <i className="bi text-md bi-headset"></i>
                <p>Signaler problème</p>
            </Link>
        </div>
    )
}

export default Sidebare
