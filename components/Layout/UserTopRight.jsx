"use client"

import { ChevronDown } from "lucide-react"

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";



function UserDropdown() {
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
                        className="absolute right-0 top-0 w-52 bg-background shadow-lg rounded-lg rounded-tr-none border overflow-hidden"
                    >
                        <div className="p-3 border-b">
                            <p className="font-medium">Mustapha Iderkaoui</p>
                            <p className="text-xs text-gray-500">mustapha.iderkaoui@rh.local</p>
                        </div>

                        <ul className="py-2 px-1">
                            <li className="flex items-center gap-2 px-3  rounded-md py-2 hover:bg-sidebar border border-transparent hover:border-foreground/10 duration-200 opacity-70 hover:opacity-100 cursor-pointer">
                                <User size={16} /> <p className="text-sm">Profile</p>
                            </li>
                            <li className="flex items-center gap-2 px-3 rounded-md  py-2 hover:bg-sidebar border border-transparent hover:border-foreground/10 duration-200 opacity-70 hover:opacity-100 cursor-pointer">
                                <Settings size={16} /> <p className="text-sm">Settings</p>
                            </li>
                            <li className="flex items-center gap-2 px-3 rounded-md  py-2 text-red-500 hover:bg-red-50 cursor-pointer  duration-200 opacity-70 hover:opacity-100">
                                <LogOut size={16} /> Logout
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
const UserTopRight = () => {
    return (
        <div className="flex bg-background p-1 pr-3 border border-foreground/10 rounded-md relative gap-3 items-start justify-start">
            <div className="p-[2]  border-2 border-chart-1 rounded-full">
                <img src="https://i.pinimg.com/1200x/e1/ab/c3/e1abc3affc8bce22b4439567c4b01d85.jpg" className="w-8 min-w-8 rounded-full object-cover h-8" alt="" />
            </div>
            <div className="">

                <h2 className="text-sm tracking-tight font-medium">Mustapha Iderkaoui</h2>
                <p className="text-sm opacity-70 tracking-tight">Administrateur</p>
            </div>

            <UserDropdown />
        </div>
    )
}

export default UserTopRight
