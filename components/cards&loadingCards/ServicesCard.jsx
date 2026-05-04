"use client"
import { LayoutDashboard, MoreHorizontal, UserKey, Users } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReadMore from "../Global/ReadMore";


const MenuOptions = ({ service, onClose, onUpdate }) => {
  const PageRef = useRef();

  const handleClickOutside = (e) => {
    if (!PageRef.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // === FUNCTIONS 

  return (
    <>

      <motion.div
        ref={PageRef}
        initial={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute flex flex-col items-start justify-start gap-2 p-1 pt-3 right-0 top-0 w-[160] z-10 bg-background shadow-lg rounded-sm rounded-tr-none border overflow-hidden"
      >

        <button
          className="p-2 opacity-80 hover:opacity-100 w-full bg-sidebar/50 hover:bg-sidebar flex items-center justify-center gap-1 cursor-pointer font-medium duration-200  text-xs rounded-sm border border-foreground/10">
          <i className="bi bi-envelope-arrow-up"></i> Contacter le chef
        </button>

        <button
          className={`text-xs opacity-80 hover:opacity-100 w-full justify-center  flex items-center gap-1 font-medium px-4 py-1.5 rounded-sm border transition-colors duration-150 cursor-pointer ${service.isActive
            ? "border-red-200 text-red-500 hover:bg-red-50"
            : "border-green-200 text-green-600 hover:bg-green-50"
            }`}
        >
          {service.isActive ? <><i className="bi bi-ban"></i> Désactiver </> : <> <i className="bi bi-check-circle"> Activer</i></>}
        </button>
      </motion.div>
    </>
  )
}


export default function ServicesCard({ service, division_id, onToggle }) {
  const [menuOpen, setmenuOpen] = useState(false)
  return (
    <div
      className={`bg-background border border-foreground/15 rounded-xl rounded-tr-none justify-between flex flex-col gap-3 transition-opacity duration-200  ${!service.isActive ? "opacity-60" : ""}`}
    >
      <div className="w-full">

        <div className="flex w-full justify-between items-start relative   gap-3">
          <p className="text-lg pt-3 px-3 font-semibold ">{service.name}</p>
          <button
            className="p-1 bg-sidebar rounded-none rounded-bl-sm border border-foreground/10"
            onClick={() => setmenuOpen(true)}>
            <MoreHorizontal className="h-4" />
          </button>

          <AnimatePresence>
            {menuOpen &&
              <MenuOptions service={service} onClose={() => setmenuOpen(false)} />
            }
          </AnimatePresence>
        </div>

        <div className="px-3 mt-2">
          <ReadMore text={service.description} className="text-sm  text-gray-500 leading-relaxed flex-1" />
        </div>

      </div>
      <div className="w-full p-3">

        {/* Description */}

        <div className="flex gap-1  items-center text-sm ">

          <UserKey className="h-4" /><span className="opacity-60">chef :</span>

          {
            service?.chef?.firstName
              ?
              <b> M. {service?.chef?.firstName} {service?.chef?.lastName}</b>
              : <span className="opacity-70">Non assigné</span>
          }

        </div>

        <div className="flex gap-2 mt-3 items-center ">
          <div className="p-1 flex gap-1 bg-sidebar items-center bg-sidebare border text-xs rounded-sm px-2 border-foreground/10">
            <Users className="h-4" /> <p>{service?.employeesCount} employés</p>
          </div>
        </div>


        <div className="flex items-center mt-3 justify-between pt-3 border-t border-gray-100">
          {/* Status badge */}

          <span
            className={`text-xs font-medium px-5 border py-1 rounded-full ${service.isActive
              ? "bg-green-50 text-green-500 border-green-500"
              : "bg-destructive/5 text-destructive border-destructive/50"
              }`}
          >
            {service.isActive ? <>Actif <i className="bi bi-check2-circle"></i> </> : <>Inactif <i className="bi bi-ban"></i></>}
          </span>


          <Link href={`/divisions/${division_id}/${service._id}`}
            className="p-1 px-3 rounded-sm items-center opacity-80 hover:opacity-100  bg-sidebar/50 hover:bg-sidebar flex  justify-center gap-2 cursor-pointer tracking-tight font-medium duration-200  text-xs  border border-foreground/10">
            <i className="bi bi-people"></i> Voir les employés
          </Link>

        </div>
      </div>
    </div >
  );
};


export const ServicesCardSkeleton = ({ ind }) => (
  <div key={ind} className="bg-background border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="h-3.5 w-[55%] bg-accent rounded-md animate-pulse" />
      <div className="h-5 w-14 bg-accent rounded-full animate-pulse" />
    </div>
    <div className="h-3 w-[90%] bg-accent rounded-md animate-pulse" />
    <div className="h-3 w-[70%] bg-accent rounded-md animate-pulse" />
    <div className="border-t border-border pt-3 flex gap-2">
      <div className="h-8 flex-1 bg-accent rounded-lg animate-pulse" />
      <div className="h-8 flex-1 bg-accent rounded-lg animate-pulse" />
    </div>
  </div>
);
