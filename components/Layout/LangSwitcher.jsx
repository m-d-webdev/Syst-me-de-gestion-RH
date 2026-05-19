"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";


const getLang = () => { return "fr"};
const setLang = () => { };


const LANGS = [
    { value: "fr", label: "Français", flag: "🇫🇷" },
    { value: "ar", label: "العربية", flag: "🇲🇦" },
];

export default function LangSwitcher() {
    const [current, setCurrent] = useState("fr");
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        setCurrent(getLang());
    }, []);

    useEffect(() => {
        const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (value) => {
        setLang(value);
        setCurrent(value);
        setOpen(false);
    };

    const active = LANGS.find((l) => l.value === current);

    return (
        <div ref={ref} className="relative inline-block">
            <button
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background  text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            >
                <span>{active.flag}</span>
                <span className="w-18 hidden md:block">{active.label}</span>
                <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className="opacity-50"
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-[calc(100%+6px)] left-0 min-w-full z-50 list-none m-0 p-1 rounded-lg border border-border bg-popover shadow-md"
                    >
                        {LANGS.map(({ value, label, flag }) => (
                            <motion.li
                                key={value}
                                role="option"
                                aria-selected={current === value}
                                onClick={() => handleSelect(value)}
                                whileHover={{ backgroundColor: "hsl(var(--accent))" }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer text-popover-foreground ${current === value ? "font-semibold bg-accent" : ""
                                    }`}
                            >
                                <span>{flag}</span>
                                <span>{label}</span>
                                {current === value && (
                                    <motion.svg
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto text-primary"
                                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    >
                                        <path d="M2.5 7l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                )}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}