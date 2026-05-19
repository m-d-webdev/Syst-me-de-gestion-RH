"use client"
import { AUTH } from '@/api/Employers/Auth';
import LoginPage from '@/app/login/page';
import { initTheme } from '@/components/Layout/SwitchTheme';
import CheckingAuth from '@/components/Popups/CheckingAuth';
import React, { useContext, createContext, useState, useEffect } from 'react'
import { Toaster } from "react-hot-toast";


const MainContextOb = createContext();


const MainContext = ({ children }) => {
    const [isAuthed, setAuthed] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [User, setUser] = useState(null);
    const [isSideBareVisible, setSideBareVisible] = useState(true)
    const CheckAuth = async () => {
        setLoading(true);
        const res = await AUTH();
        if (res.authed == true) {
            setUser(res.data)
            setAuthed(true)
        }
        else {
            setAuthed(false)
            setUser(null)

        }

        setLoading(false);
    };

    useEffect(() => {
        CheckAuth();
        initTheme()
    }, []);


    return <MainContextOb.Provider value={{
        User,
        isSideBareVisible,
        setSideBareVisible
    }}>

        {
            isLoading ?
                <CheckingAuth isLoading={isLoading} />
                :
                <>
                    {isAuthed
                        ? children
                        : <LoginPage setAuthed={() => setAuthed(true)} />
                    }
                </>
        }

        {/* {children} */}
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    borderRadius: "10px",
                    padding: "8px",
                    fontSize: "14px",
                    fontWeight: "500"
                },
                success: {
                    style: {
                        background: "#F0FDF4",
                        border: "solid 1px  #86EFAC"
                    },
                },
                error: {
                    style: {
                        background: "#FEE2E2",
                        color: "red",
                        border: "solid 1px #FEF2F2"
                    },
                },
            }}
        />
    </MainContextOb.Provider>
}

export const UseMainConext = () => {
    const { User, isSideBareVisible, setSideBareVisible } = useContext(MainContextOb);
    return {
        User, isSideBareVisible, setSideBareVisible
    };

}

export default MainContext
