"use client";

import NotFOund_lottie from "@/components/Lotties/404_lottie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center px-6 bg-background text-foreground">
            <div
                className={`flex flex-col items-center text-center gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"
                    }`}
            >
                {/* 404 outline */}
                < NotFOund_lottie />

                {/* Divider */}
                <div className="w-10 h-px bg-border" />

                {/* Message */}
                <div className="flex flex-col gap-2 max-w-xs">
                    <p className="text-base font-medium tracking-tight">
                        Page introuvable
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        La page que vous cherchez n'existe pas ou a été déplacée.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 w-[150] justify-center flex items-center py-2 rounded-lg text-sm font-medium bg-foreground text-background hover:opacity-80 transition-opacity"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                            <path d="M9 21V12h6v9" />
                        </svg>
                        Accueil
                    </Link>


                </div>

                {/* Hint */}
                <p className="font-mono text-xs text-muted-foreground opacity-40 tracking-widest mt-2">
                    erreur · 404 · not_found
                </p>
            </div>
        </div>
    );
}