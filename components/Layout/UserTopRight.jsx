"use client"

import { ChevronDown } from "lucide-react"

const UserTopRight = () => {
    return (
        <div className="flex gap-3 items-start justify-start">
            <div className="p-1 border-2 border-chart-1 rounded-full">
                <img src="https://i.pinimg.com/1200x/e1/ab/c3/e1abc3affc8bce22b4439567c4b01d85.jpg" className="w-8 rounded-full object-cover h-8" alt="" />
            </div>
            <div className="">

                <h2 className="text-sm tracking-tight font-medium">Mustapha Iderkaoui</h2>
                <p className="text-sm opacity-70 tracking-tight">Administrateur</p>
            </div>
            <button className="mt-1 ml-2 text-chart-1 cursor-pointer p-1 bg-accent rounded-full border border-foreground/10">
                <ChevronDown className="w-4 h-4" />
            </button>
        </div>
    )
}

export default UserTopRight
