import { Check } from 'lucide-react'
import React from 'react'

const CheckBoxinput = ({ ...props }) => {
    const Theid = `;soifa${Math.random() * 3273}`
    return (
        <>
            <input  {...props} className='hidden peer' type='checkbox' id={Theid} />
            <label htmlFor={Theid} className="w-[18] duration-200 h-[18] rounded peer-checked:bg-chart-1 border border-foreground/20 bg-background flex cursor-pointer items-center peer-checked:border-none peer-checked:text-white  text-background justify-center"> <Check className='w-[12] stroke-3 h-[12] ' /> </label>

        </>
    )
}

export default CheckBoxinput
