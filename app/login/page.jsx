"use client";



import Loader1 from "@/components/Global/Loader1";
import Logo from "@/components/Global/Logo";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// LOGIN is passed as a prop — it accepts { email, password }
export default function LoginPage({ LOGIN }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            await LOGIN({ email, password });
        } catch (err) {
            setError(err?.response?.data?.message || "Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-foreground/30 w-screen h-screen fixed top-0 right-0 flex justify-center items-center">

            <div className="rounded-2xl  bg-background px-4 w-[500] shadow-xl overflow-hidden">
                <div className="px-3 pt-10 pb-10">
                    {/* Logo / Brand */}
                    <div className="mb-8">
                        <div className="flex items-start gap-3 mb-6">
                            <Logo h="h-15" />
                            <span className="text-foreground   font-medium tracking-tight ">
                                Administration des Ressources Humaines
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">
                            Content de te revoir
                        </h1>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                            Connectez-vous à votre compte pour continuer
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
                            <i className="bi text-destructive bi-bug"></i>
                            <p className="text-sm text-destructive">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground"
                            >
                                Adresse email
                            </label>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="exampleou@gmail.com"
                                type="email"
                                icon={<i className="bi bi-envelope"></i>}
                                disabled={loading}
                            />

                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Mot de passe
                                </label>
                            </div>
                            <div className="relative">
                                <Input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    icon={<i className="bi bi-lock"></i>}
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <p className="opacity-70 text-sm">En cas d’oubli de vos identifiants de connexion, veuillez contacter l’administration des ressources humaines.</p>
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-1 rounded-lg bg-primary px-4 py-2.5
                  text-sm font-semibold text-primary-foreground
                  transition-all duration-150
                  hover:bg-primary/90 active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-primary/40
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                  flex items-center justify-center gap-2
                "
                        >
                            {loading ? (
                                <>
                                    <Loader1 />
                                    Connexion …
                                </>
                            ) :
                                "Connexion"
                            }

                        </button>
                    </form>




                </div>
            </div>
        </div>

    );
}