import { useEffect, useState } from "react";

const steps = [
    "Vérification de l'identité",
    "Validation des permissions",
    "Sécurisation de la session",
];

export default function CheckingAuth({ isLoading }) {
    const [activeStep, setActiveStep] = useState(0);

    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "var(--background)" }}
        >
            <div
                className="w-full max-w-xs rounded-2xl p-8 flex flex-col items-center gap-6"
                style={{
                    backgroundColor: "var(--card, var(--background))",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 32px 0 color-mix(in srgb, var(--chart-1) 10%, transparent)",
                }}
            >
                {/* Spinner */}
                <div className="relative w-12 h-12">
                    <svg className="absolute inset-0 animate-spin" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="20" strokeWidth="3" stroke="var(--border)" />
                        <path
                            d="M24 4 a20 20 0 0 1 20 20"
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="var(--chart-1)"
                        />
                    </svg>
                    <svg
                        className="absolute inset-0 m-auto w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--chart-1)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Title */}
                <div className="text-center space-y-1">
                    <p className="text-base font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                        Authentification en cours
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
                        Connexion sécurisée établie
                    </p>
                </div>

                {/* Steps */}
                <div className="w-full space-y-3">
                    {steps.map((label, i) => {
                        const isDone = i < activeStep;
                        const isActive = i === activeStep;
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-3 transition-opacity duration-500"
                               
                            >
                                <div
                                    className="w-2 h-2 rounded-full bg-foreground flex-shrink-0 transition-all duration-300"
                                />
                                <span
                                    className="text-xs tracking-wide flex-1"
                                >
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}