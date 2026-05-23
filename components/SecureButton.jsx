import React, { useEffect, useRef, useState } from 'react'
import Loader1 from './Global/Loader1';
import { UseMainConext } from '@/contexts/MainContext';
import { AnimatePresence, motion } from 'framer-motion';

import { CHECK_EXTRADATA_TOKEN, GET_EXTRADATA_TOKEN } from '@/api/Employers/Auth';



const SecureButton = ({ children, urlToAddToken, onClick = () => { }, className, ...props }) => {
    const { TokenToGetExtraData, setTokenToGetExtraData } = UseMainConext()
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isError, setisError] = useState(false)
    const [code, setCode] = useState("")
    const [isCheking, setCheking] = useState(false)
    const [isSubmiting, setisSubmiting] = useState(false)


    const handleClick = async () => {
        setMenuOpen(true);
        if (TokenToGetExtraData) {
            setCheking(true);
            const CheckIsStillValid = await CHECK_EXTRADATA_TOKEN(TokenToGetExtraData);
            if (CheckIsStillValid.success) {
                setCheking(false);
                setMenuOpen(false)
                if (urlToAddToken) {
                    const url = `${urlToAddToken}?token=${encodeURIComponent(TokenToGetExtraData)}`;
                    window.open(url, "_blank");
                }
                else {
                    onClick();
                }
            }
        }
    };
    const handleSubmitCode = async () => {
        setMenuOpen(true);
        setisSubmiting(true);
        const res = await GET_EXTRADATA_TOKEN(code);
        if (res.success && res.token2) {
            setisError(false);
            setTokenToGetExtraData(res.token2);
            setisSubmiting(false);
            setMenuOpen(false);
            if (urlToAddToken) {
                const url = `${urlToAddToken}?token=${encodeURIComponent(res.token2)}`;
                window.open(url, "_blank");
            }
            else {
                onClick();
            }
        }
        else {
            setisError(true);
            setTokenToGetExtraData(null);
            setisSubmiting(false);
        }
    };
    const CompoRef = useRef();
    const handleClickOutside = (e) => {
        if (!CompoRef.current?.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (!isMenuOpen) return;
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className='relative'>
            <div
                onClick={handleClick}
                className={`${className} cursor-pointer`}
                {...props}
            >
                {children}
            </div>
            <AnimatePresence>
                {
                    isMenuOpen &&
                    <motion.div
                        initial={{
                            scale: .7,
                            opacity: .8,
                        }}
                        ref={CompoRef}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transformOrigin: "top right",


                        }}
                        className='absolute w-[200] z-[10] bg-foreground text-background drop-shadow-md text-xs top-0 right-0 p-2 rounded-md'
                        closeIfClickOutside={true} backWhenClose={false}>

                        {
                            isCheking ?
                                <div className="w-full flex gap-2 justify-center flex-col items-center h-[90]">
                                    <Loader1 className='before:border-background' />
                                    Vérification…
                                </div>
                                :      /* ── Code Entry Card ── */
                                <div>

                                    <label className="block text-xs  opacity-80 font-semibold uppercase tracking-widest mb-3">
                                        Code d'accès
                                    </label>

                                    <div className={`relative flex items-center rounded-xl border transition-all duration-200 ${isError
                                        ? "border-red-400 dark:border-red-500  dark:bg-red-950/30"
                                        : "border-slate-200 dark:border-zinc-700 "
                                        }`}>
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={e => setCode(e.target.value)}
                                            placeholder="code"
                                            className="flex-1 bg-transparent p-2 px-2 text-sm font-mono tracking-widest  outline-none"
                                            autoComplete="off"
                                            spellCheck={false}
                                        />
                                    </div>

                                    {/* Error message */}
                                    {isError && (
                                        <p className="mt-1 tracking-tight text-xs text-red-500 dark:text-red-400 flex items-center ">
                                            Vérifiez votre code auprès des RH
                                        </p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        onClick={handleSubmitCode}
                                        disabled={!code.trim() || isCheking}
                                        className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-background text-foreground text-sm font-medium py-2 transition-all duration-150  disabled:opacity-40 disabled:cursor-not-allowed "
                                    >
                                        {
                                            isSubmiting
                                                ? <Loader1 className='before:border-foreground' wh='w-[15] h-[15]' />

                                                : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                        }
                                        Déverrouiller l'accès
                                    </button>
                                </div>

                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default SecureButton
