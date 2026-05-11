"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";


const CopyContainer = ({ text, className, pClassName = "truncate", icon, ...props }) => {

    const HandleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Texte copié avec succès")
        } catch (error) {
            toast.error("Impossible de copier le texte")
        }
    }

    return (
        <div className={`opacity-70 hover:opacity-100 duration-200 bg-sidebar border flex items-center gap-2 border-foreground/10 rounded-sm ${className}`}>
            <div className=" px-2 flex items-center gap-1">
                <div className="opacity-50">
                    {icon}
                </div>
                <p className={`text-sm ${pClassName}`}>{text}</p>
            </div>
            <button onClick={HandleCopyText} className="bg-background cursor-pointer p-1 px-2 border-l border-l-foreground/20 rounded-r-sm">
                <Copy className="w-4 h-4 stroke-1 " />
            </button>
        </div>
    )
}

export default CopyContainer
