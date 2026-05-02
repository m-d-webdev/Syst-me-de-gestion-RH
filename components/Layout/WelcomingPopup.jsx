"use client"
import { useState, useEffect } from "react";
import Dialog from "../Global/Dialog";
import WelcomeLottie from "../Lotties/Welcome";

export default function WelcomePopup() {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        localStorage.setItem("welcomingMessage", true);
        setVisible(false);
    };

    useEffect(() => {
        setTimeout(() => {
            if (typeof (localStorage) != undefined) {
                const isAlreadyDisplayed = localStorage.getItem("welcomingMessage");
                if (isAlreadyDisplayed) {
                    setVisible(false);
                } else {
                    setVisible(true);
                }
            }
        }, 1000)

    }, [])
    return (
        <>
            {
                visible ?
                    <Dialog onClose={onClose} containerClassName="w-[550]" closeIfClickOutside={false} backWhenClose={false}>

                        <div className="w-full flex flex-col justify-center items-center gap-2">
                            {/* Icon badge */}
                            <WelcomeLottie />

                            <div>
                                <h2 className="text-2xl font-bold  leading-tight">
                                    Bienvenue sur votre espace RH
                                </h2>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mx-8 border-t border-accent/10" />

                        {/* Body */}
                        <div className="px-8 py-6 text-center space-y-4 text-sm leading-relaxed /80">
                            <p>
                                Nous sommes ravis de vous accueillir sur ce portail dédié à la gestion des ressources humaines. Cet espace a été conçu pour vous accompagner dans vos missions quotidiennes.
                            </p>

                            <p className="/90 font-medium text-center">
                                <span className="font-bold text-red-600 ">Site en cours de développement.</span>{" "}
                                Certaines fonctionnalités sont encore en construction. Merci de votre patience — nous travaillons activement pour améliorer votre expérience.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8 flex items-center gap-3 justify-center">

                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 w-[200] rounded-xl bg-chart-1 text-white font-semibold text-sm shadow-md  active:scale-95 transition-all duration-150"
                            >
                                J’ai compris →
                            </button>
                        </div>
                    </Dialog>
                    : null
            }
        </>
    );
}