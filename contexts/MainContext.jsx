"use client"
import { AUTH } from '@/api/Employers/Auth';
import LoginPage from '@/app/login/page';
import CheckingAuth from '@/components/Popups/CheckingAuth';
import React, { useContext, createContext, useState, useEffect } from 'react'
import { Toaster } from "react-hot-toast";


const MainContextOb = createContext();


const MainContext = ({ children }) => {
    const [isAuthed, setAuthed] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [User, setUser] = useState(null);

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
    }, []);


    return <MainContextOb.Provider value={{ User }}>

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
    const { User } = useContext(MainContextOb);
    return { User };

}

export default MainContext
