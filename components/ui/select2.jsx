"use client"

import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react"

const SelectMenu = ({
  onClose,
  list = [],
  orderAlphabet,
  onChange,
  overedItem = () => { }
}) => {
  const PageRef = useRef();
  const handleClickOutside = (e) => {
    if (!PageRef.current?.contains(e.target)) {
      onClose();
    }
  };


  const handleOptionFirstLetter = (e) => {
    const key = e.key;
    let Index = list
      ?.sort((a, b) => {
        return orderAlphabet
          ? a.innerText.localeCompare(b.innerText)
          : 0
      })
      ?.findIndex(l => l?.innerText.toLowerCase()?.startsWith(key.toLowerCase()))

    PageRef.current?.scrollTo({
      top: Index * 40,
      left: 0,
      behavior: "smooth"
    })


  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handleOptionFirstLetter);
    return () => {
      document.removeEventListener("keyup", handleOptionFirstLetter);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div
      onMouseLeave={() => overedItem("")}
      initial={{
        opacity: 0,
        height: 10
      }}
      exit={{
        opacity: 0,
        height: 10
      }}
      animate={{
        opacity: 1,
        height: list.length * 50
      }}
      ref={PageRef}

      className="w-full p-3 flex flex-col  overflow-auto rounded-b-md z-[10] max-h-[200] left-0 absolute top-full bg-background drop-shadow-md "
    >
      {
        list &&
        list
          .sort((a, b) => {
            return orderAlphabet
              ? a.innerText.localeCompare(b.innerText)
              : 0
          })
          .map((option, i) =>

            <p
              key={i}
              onClick={
                () => {
                  onChange(option)
                }
              }
              onMouseOver={() => overedItem(option.innerText)}
              className="hover2 tracking-tight duration-150 hover:font-medium first-letter:uppercase lowercase p-2 px-3 cursor-pointer hover:bg-accent/50"
            >
              {option.innerText}
            </p>

          )
      }
    </motion.div>
  )
}
const Select2 = ({
  label = "",
  id = "input",
  className,
  parentClassName = "",
  type,
  placeholder = " ",
  icon,
  orderAlphabet = false,
  onChange = () => { },
  list = [{
    value: "",
    innerText: ""
  }],
  ...props
}) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const [HovredItem, setHovredItem] = useState("");
  return (
    <div
      onClick={() => setmenuOpen(pv => !pv)}
      className={`${parentClassName} px-9 tracking-tight  flex items-center  bg-sidebar/30 ${icon ? "max-w-[380] w-full" : "max-w-[350]"} h-[50]  relative border border-foreground/10  ${menuOpen ? "rounded-t-[8]" : "rounded-[8]"} p-1 px-3 `}>

      <div
        className={`  opacity-50 absolute duration-150  ${menuOpen ? "opacity-100 text-gold " : ""}    ltr:left-2  rtl:right-2  `}
      >
        {
          React.isValidElement(icon) && icon
        }
      </div>

      <label className={`px-3 text-sm ${(menuOpen || (value != "" && value != null)) ? "translate-y-[-10px]  opacity-60" : ""}  ${icon ? "ltr:left-6 rtl:right-6" : ""}    capitalize absolute duration-150 font-medium tracking-tight       `}>{label}</label>

      <div className="max-w-full   overflow-hidden">

        {
          (HovredItem == "" || !menuOpen) &&
          <h2 className="mt-4 truncate  max-w-[100%] text-nowrap font-semibold !tracking-tighter">{value}</h2>
        }
        {
          (HovredItem != "" && menuOpen) &&
          <p className="opacity-60 mt-4 font-medium  text-nowrap  text-sm">{HovredItem}</p>
        }
      </div>
      {
        (value == null) &&
        <p className="opacity-60   mt-4  text-sm font-semibold !tracking-tighter">{placeholder}</p>
      }


      <ChevronUp className={`w-5 ease-linear duration-200 h-5 opacity-70  ${menuOpen ? "" : "rotate-[180deg]"} absolute  ltr:right-2  rtl:left-2`} />

      <AnimatePresence>
        {

          menuOpen &&
          <SelectMenu
            orderAlphabet={orderAlphabet}
            list={list}
            overedItem={v => {
              setHovredItem(v)
            }}
            onChange={v => {
              setValue(v.innerText)
              setHovredItem("")
              onChange(v.value)
            }}
            onClose={() => {
              setmenuOpen(false)
              setHovredItem("")
            }}
          />
        }
      </AnimatePresence>
    </div>
  )
}
export default Select2;