"use client"
import React, { useContext, createContext } from 'react'


const MainContextOb = createContext();


const MainContext = ({ children }) => {
    const isAuthed = false;

    <>
        {children}
    </>
}

export const UseMainConext = () => {
    const { } = useContext(MainContextOb);
    return {};

}

export default MainContext
