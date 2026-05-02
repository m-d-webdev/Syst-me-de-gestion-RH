"use client"

import { ChevronDown } from "lucide-react"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { UseMainConext } from "@/contexts/MainContext";
import { LOGOUT } from "@/api/Employers/Auth";



function UserDropdown() {
    const { User: data } = UseMainConext();

    const [open, setOpen] = useState(false);
    const PageRef = useRef();
    const handleClickOutside = (e) => {
        if (!PageRef.current?.contains(e.target)) {
            setOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="">
            {/* Avatar button */}
            <button
                onClick={() => setOpen(!open)}
                className="mt-1 ml-2 text-chart-1 cursor-pointer p-1 bg-accent rounded-full border border-foreground/10">
                <ChevronDown className="w-4 h-4" />
            </button>
            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={PageRef}
                        initial={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute p-2 pt-5 right-0 top-0 w-[300] z-10 bg-background shadow-lg rounded-lg rounded-tr-none border overflow-hidden"
                    >
                        <div className="px-2 truncate border-b pb-8">
                            <p className="font-semibold uppercase tracking-tight  text-lg">{data.firstName} {data.lastName}</p>
                            <p className="text-sm opacity-70 truncate flex gap-1 items-center ">{data.email}</p>
                            <p className="text-sm mt-3  truncate flex gap-1 items-center "><i className="bi bi-mortarboard"></i>{data?.grade_id?.name}</p>
                            <p className="text-sm mt-3  truncate flex gap-1 items-center "><i className="bi bi-building"></i>{data?.division_id?.name}</p>
                            <p className="text-sm ml-2 mt-1  truncate flex gap-1 items-center "><i className="bi bi-bezier2"></i>{data?.service_id?.name}</p>
                        </div>

                        <button onClick={LOGOUT} className="flex w-full justify-center  bg-destructive/10 border border-destructive/20 rounded-md items-center gap-2 px-3   py-2 text-red-500 hover:bg-destructive/15 cursor-pointer  duration-200 opacity-70 hover:opacity-100">
                            <LogOut size={16} /> Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
const UserTopRight = () => {
    const { User } = UseMainConext();

    return (
        <div className="flex bg-background p-1 pr-3 border border-foreground/10 rounded-md relative gap-3 items-start justify-start">
            <div className="p-[2]  border-2 border-chart-1 rounded-full">
                <img src="https://i.pinimg.com/1200x/e1/ab/c3/e1abc3affc8bce22b4439567c4b01d85.jpg" className="w-8 min-w-8 rounded-full object-cover h-8" alt="" />
            </div>
            <div className="truncate">

                <h2 className="text-sm truncate tracking-tight font-medium text-nowrap ">{User.firstName} {User.lastName}</h2>
                <p className="text-xs opacity-70 tracking-tight">{User?.grade_id?.name}</p>
            </div>

            <UserDropdown />
        </div>
    )
}

export default UserTopRight
