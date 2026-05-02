"use client"
import { AUTH } from '@/api/Employers/Auth';
import LoginPage from '@/app/login/page';
import CheckingAuth from '@/components/Popups/CheckingAuth';
import React, { useContext, createContext, useState, useEffect } from 'react'


const MainContextOb = createContext();


const MainContext = ({ children }) => {
    const [isAuthed, setAuthed] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [User, setUser] = useState(false);

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
    </MainContextOb.Provider>
}

export const UseMainConext = () => {
    const { User } = useContext(MainContextOb);
    return { User };

}

export default MainContext
