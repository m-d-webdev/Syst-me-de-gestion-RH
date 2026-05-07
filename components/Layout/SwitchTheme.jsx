"use client";

import { Monitor, Moon, Sun } from "lucide-react";


export default function SwitchTheme() {
    
    return (
        <div className="flex bg-background border border-foreground/10 rounded-md p-1 w-fit  items-center gap-2">
            {/* Light */}
            <button
                onClick={() => setTheme("light")}
                className="flex items-center gap-2 cursor-pointer bg-sidebar border border-foreground/10 px-2 opacity-70 hover:opacity-100 duration-200 rounded-sm  p-1  transition text-sm"
            >
                <Sun className="w-4 h-4 " />
            </button>

            {/* Dark */}
            <button
                onClick={() => setTheme("dark")}
                className="flex items-center gap-2 cursor-pointer bg-sidebar border border-foreground/10 px-2 opacity-70 hover:opacity-100 duration-200 rounded-sm  p-1  transition text-sm"
            >
                <Moon className="w-4 h-4 " />
            </button>

            {/* Auto / System */}
            <button
                onClick={() => setTheme("auto")}
                className="flex items-center gap-2 cursor-pointer bg-sidebar border border-foreground/10 px-2 opacity-70 hover:opacity-100 duration-200 rounded-sm  p-1  transition text-sm"
            >
                <Monitor className="w-4 h-4" />
            </button>
        </div>
    );
}


const STORAGE_KEY = "theme-preference";

function resolveEffective(preference) {
    if (preference === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return preference;
}

function applyTheme(preference) {
    const effective = resolveEffective(preference);
    document.documentElement.setAttribute("data-theme", effective);
    document.documentElement.classList.toggle("dark", effective === "dark");
}

export function setTheme(preference) {
    if (!["light", "dark", "auto"].includes(preference)) {
        console.warn(`[setTheme] Invalid value: "${preference}". Use "light", "dark", or "auto".`);
        return;
    }
    localStorage.setItem(STORAGE_KEY, preference);
    applyTheme(preference);
}

export function getTheme() {
    return localStorage.getItem(STORAGE_KEY) ?? "auto";
}

export function initTheme() {
    const stored = getTheme();
    applyTheme(stored);

    // Keep "auto" in sync with OS changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (getTheme() === "auto") applyTheme("auto");
    });
}