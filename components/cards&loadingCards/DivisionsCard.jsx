"use client"
import { Plus, UserKey } from "lucide-react";

export default function DivisionCard({ service, onToggle }) {
  return (
    <div
      className={`bg-background border border-gray-200 rounded-xl p-5 flex flex-col gap-3 transition-opacity duration-200 hover:border-gray-300 ${!service.isActive ? "opacity-60" : ""
        }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold ">{service.name}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1">
        {service.description}
      </p>
      <div className="flex gap-1 items-center text-sm ">
        <UserKey className="h-4" /><span className="opacity-60">chef :</span>
        <b>{service?.chef?.firstName} {service?.chef?.lastName}</b>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Status badge */}
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${service.isActive
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-400"
            }`}
        >
          {service.isActive ? "Actif" : "Inactif"}
        </span>

        {/* Toggle button */}
        <button
          onClick={() => onToggle(service.id)}
          className={`text-xs flex items-center gap-1 font-medium px-4 py-1.5 rounded-lg border transition-colors duration-150 cursor-pointer ${service.isActive
            ? "border-red-200 text-red-500 hover:bg-red-50"
            : "border-green-200 text-green-600 hover:bg-green-50"
            }`}
        >
          {service.isActive ? <>Désactiver <i className="bi bi-ban"></i></> : <>Activer <i className="bi bi-check-circle"></i></>}
        </button>
      </div>
    </div >
  );
}
export const DivisionCardSkeleton = ({ ind }) => (
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