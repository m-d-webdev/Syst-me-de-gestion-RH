"use client";


import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserPic } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { GET_USERS } from "@/api/Employers/User";
import { CREATE_ATTENDANCE } from "@/api/Attendance";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Loader1 from "@/components/Global/Loader1";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "@/components/ui/calendar";
import { MoveLeft, RefreshCcw, Wrench } from "lucide-react";
import Link from "next/link";
import TableCardItem from "@/components/cards&loadingCards/TableCard";
import SignatureErea from "@/components/Signature";
import { UseMainConext } from "@/contexts/MainContext";
import { Input } from "@/components/ui/input";

const page = () => {

    const [Search, setSearch] = useState("")
    const [isLoading, setLoading] = useState(true);
    const [isSubmiting, setisSubmiting] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [AttendanceChekingList, setAttendanceChekingList] = useState([]);
    const [date, setDate] = useState(moment().format("D-M-yyy"));
    const [SubmitedList, setSubmitedList] = useState([]);

    const today = moment();
    const isToday = moment(date, "D-M-YYYY").isSame(moment(), "day");
    const isAfterToday = moment(date, "D-M-YYYY").isAfter(moment(), "day");

    const Get_USERS = async () => {
        setLoading(true);
        const res = await GET_USERS({ limit: 99999 });
        setAttendanceChekingList(res?.data?.map(u => ({ ...u, presente: true, justification: null, signature: null, isSubmitingSelf: false })))
        setLoading(false);
    };

    useEffect(() => {
        Get_USERS();
    }, []);

    const handleTogglePresense = (id) => {
        setAttendanceChekingList(pv => pv.map(ele => ele._id == id
            ? {
                ...ele,
                presente: ele.presente == true ? false : true,
                signature: ele.presente == true ? null : ele.signature
            }
            : ele
        ));


    }

    const handleSignature = (id, svg) => {
        setAttendanceChekingList(pv => pv.map(ele => ele._id == id
            ? {
                ...ele,
                signature: svg
            }
            : ele
        ));


    }


    const handleUploadFIles = (e, id) => {
        const file = e.target.files[0];
        if (!file) return;
        setAttendanceChekingList(pv =>
            pv.map(ele =>
                ele._id === id ?
                    { ...ele, justification: file }
                    : ele
            )
        );
    };

    // ==============================
    const handleSUBMIT = async () => {
        setisSubmiting(true);
        try {
            for (const u of AttendanceChekingList) {
                if (u.justification != null) {
                    const period = isMorningPeriod ? "morning" : isAfternoonPeriod ? "afternoon" : null

                    const formData = new FormData();
                    formData.append("user_id", u._id);
                    formData.append("date", date);
                    formData.append("period", period);

                    formData.append("justification", u.justification);
                    const res = await CREATE_ATTENDANCE(formData);

                    if (res.data) {
                        setSubmitedList((pv) => [...pv, u._id]);
                    };

                } else {
                    const { _id } = u;
                    const period = isMorningPeriod ? "morning" : isAfternoonPeriod ? "afternoon" : null

                    const res = await CREATE_ATTENDANCE({
                        user_id: _id,
                        date,
                        period
                    });

                    if (res.data) {
                        setSubmitedList((pv) => [...pv, u._id]);

                    };


                }

            }

        } catch (error) {
            console.log({ error });
        } finally {
            setisSubmiting(false);
        }
    };
    const handleSubmitSingle = async (data) => {
        try {
            setAttendanceChekingList(pv => pv.map(ele => ele._id == data._id
                ? {
                    ...ele,
                    isSubmitingSelf: true
                }
                : ele
            ));
            if (data.justification != null) {
                const period = isMorningPeriod ? "morning" : isAfternoonPeriod ? "afternoon" : null

                const formData = new FormData();
                formData.append("user_id", data._id);
                formData.append("date", date);
                formData.append("period", period);
                formData.append("isPresente", data.presente);
                formData.append("justification", data.justification);

                if (data.signature != null) {
                    formData.append("signature", JSON.stringify(data.signature));
                };

                const res = await CREATE_ATTENDANCE(formData);

                if (res.data) {
                    setSubmitedList((pv) => [...pv, data._id]);
                };

            } else {
                const { _id, signature, presente } = data;
                let JSONSIGNATURE = signature != null ? JSON.stringify(signature) : signature;
                const period = isMorningPeriod ? "morning" : isAfternoonPeriod ? "afternoon" : null
                const res = await CREATE_ATTENDANCE({
                    user_id: _id,
                    date,
                    period,
                    isPresente: presente,
                    signature: JSONSIGNATURE,
                });

                if (res.data) {
                    setSubmitedList((pv) => [...pv, data._id]);

                };

            }
            setAttendanceChekingList(pv => pv.map(ele => ele._id == data._id
                ? {
                    ...ele,
                    isSubmitingSelf: true
                }
                : ele
            ));
        } catch (error) {
            console.log({ error });
        } finally {
            setAttendanceChekingList(pv => pv.map(ele => ele._id == data._id
                ? {
                    ...ele,
                    isSubmitingSelf: false
                }
                : ele
            ));
            setisSubmiting(false);
        }
    };


    const handleRefresh = () => {
        setSubmitedList([])
        setAttendanceChekingList(pv =>
            pv.map(
                ele => (
                    { ...ele, presente: true, signature: null, justification: null }
                )
            )
        );
    }
    // ====================
    const headers = [
        <div className="flex  pl-3 w-fit items-center justify-center gap-2">

            <p className="tracking-tight">Nom</p>
        </div>,
        <p p className="tracking-tight" > Présence</p>,
        <p className="tracking-tight">Signature</p>,
        <p className="tracking-tight">Justification</p>,
        <p className="tracking-tight">Action</p>,
    ];

    const now = moment();

    // 08:30 AM -> 01:00 PM
    const [isMorningPeriod, setisMorningPeriod] = useState(
        now.isBetween(
            moment().set({ hour: 8, minute: 30, second: 0 }),
            moment().set({ hour: 13, minute: 0, second: 0 }),
            undefined,
            "[]"
        ));

    // 01:01 PM -> 04:30 PM
    const [isAfternoonPeriod, setisAfternoonPeriod] = useState(now.isBetween(
        moment().set({ hour: 13, minute: 1, second: 0 }),
        moment().set({ hour: 16, minute: 30, second: 0 }),
        undefined,
        "[]"
    ));

    let rows = AttendanceChekingList
        ?.filter((a) => {
            if (Search === "") return true;
            const searchLower = Search.toLowerCase();
            const aName = a.firstName.toLowerCase();

            // Replace any vowel in the search with a "any vowel" group
            const vowelFlex = searchLower.replace(/[aeiou]/g, "[aeiou]");

            // Then make consonants fuzzy too (allow skipped letters)
            const fuzzyPattern = new RegExp(
                vowelFlex.split("").join(".*?"),
                "i"
            );

            return fuzzyPattern.test(aName);
        })
        ?.map((i, idx) =>
            <TableRow className={`relative`} key={idx}>
                {
                    SubmitedList?.includes(i._id) &&
                    <div
                        className="bg-background/60 text-green-500 font-semibold  flex justify-center items-center w-full h-full  absolute top-0 right-0 z-[2]">
                        <p
                            style={{
                                backdropFilter: "blur(8px)"
                            }}
                            className="bg-background border border-foreground/10 p-1 px-3 ">
                            Présence enregistrée avec succès
                        </p>
                    </div>
                }
                <TableCell className={"flex truncate  items-center gap-3  pl-5"}>



                    <p className="max-w-[200] flex items-center gap-2  truncate">
                        <img src={UserPic()} className="w-7 h-7 object-cover rounded-full" alt="" />
                        {i.firstName} {i.lastName}
                    </p>

                </TableCell>

                <TableCell>
                    <div className="flex gap-2 items-center "></div>
                    <div className={`w-fit flex   items-center `}>
                        {
                            isMorningPeriod &&
                            <p
                                onClick={() => handleTogglePresense(i._id, "morning")}
                                className={`flex font-semibold  gap-2 cursor-pointer rounded-2xl border p-2 items-center ${i.presente == true ? "bg-green-500/5 border-green-500/20 text-green-600"
                                    : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                            >
                                <CheckBoxinput
                                    onClick={() => handleTogglePresense(i._id, "morning")}
                                    labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                                    checked={i.presente == true}
                                />
                                matin
                            </p>
                        }
                        {
                            isAfternoonPeriod &&
                            <p
                                onClick={() => handleTogglePresense(i._id, "afternoon")}
                                className={`flex font-semibold  gap-2 cursor-pointer rounded-2xl border p-2 items-center ${i.presente == true ? "bg-green-500/5 border-green-500/20 text-green-600"
                                    : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                            >
                                <CheckBoxinput
                                    onClick={() => handleTogglePresense(i._id, "afternoon")}
                                    labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                                    checked={i.presente}
                                />
                                après-midi
                            </p>
                        }
                    </div>


                </TableCell>

                <TableCell>

                    <SignatureErea
                        disabled={i.presente == false}
                        isSigned={AttendanceChekingList.find(ele => ele._id == i._id)?.signature != null}
                        onSave={(svg) => handleSignature(i._id, svg)}
                        data={i}
                    />

                </TableCell>
                <TableCell>
                    <div className={`!w-fit relative cursor-pointer flex items-center gap-2 rounded-md font-medium border  bg-accent  border-foreground/20 `}>
                        {
                            i.presente == true &&
                            <div className="w-full z-[3] rounded-2xl bg-background/50 h-full absolute top-0 right-0 ">
                            </div>
                        }

                        <input onChange={e => handleUploadFIles(e, i._id)} type="file" className="hidden" id={`inpudtforjustification${i._id}`} />

                        <label htmlFor={`inpudtforjustification${i._id}`} className="px-3 z-[1] p-1">

                            {
                                i.justification == null ?
                                    <>justification <i className="bi bi-file-earmark-arrow-up"></i></>
                                    : <div className="text-green-500 truncate max-w-[200]">{i.justification?.name} <i className="bi bi-check2-circle"></i></div>
                            }
                        </label>

                    </div>

                </TableCell>
                <TableCell>
                    <button
                        disabled={i.isSubmitingSelf || isAfterToday}
                        onClick={() => handleSubmitSingle(i)} className="flex disabled:opacity-50 items-center gap-2 bg-foreground rounded-md text-background p-2 px-4 font-semibold">Soumettre
                        {
                            i.isSubmitingSelf
                                ? <Loader1 wh=" w-[15] h-[15]" />
                                : <i className="bi bi-arrow-right-circle"></i>
                        }
                    </button>
                </TableCell>

            </TableRow >
        );
    // ========= CALENDARE COM-----------

    const CalendarDayRef = useRef();
    const handleClickOutside = (e) => {
        if (!CalendarDayRef.current?.contains(e.target)) {
            setCalendarOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    

    useEffect(() => {
        if (isToday && !now.isBetween(
            moment().set({ hour: 13, minute: 1, second: 0 }),
            moment().set({ hour: 16, minute: 30, second: 0 }),
            undefined,
            "[]"
        )) {
            setisAfternoonPeriod(false)
            setisMorningPeriod(true)
        }
    }, [date]);


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return (

        <div className="w-full p-4">

            <div className="flex md:justify-between flex-wrap-reverse items-center  ">
                <Input
                    onChange={e => setSearch(e.target.value)}
                    parentclassName={"!py-1 md:w-[250] mr-6"}
                    icon={<i className="bi bi-search"></i>}
                    placeholder="Rechercher..."

                />
                <div className="flex  flex-wrap-reverse  md:gap-5 gap-1  md:pr-6 md:items-center items-end justify-end">
                    {
                        !isAfterToday &&
                        <div
                            className="flex text-sm gap-2 items-center"
                        >
                            <h1 className="text-sm opacity-70">Period du jour</h1>
                            <button onClick={
                                () => {
                                    setisMorningPeriod(true);
                                    setisAfternoonPeriod(false)
                                }

                            } className={` cursor-pointer  p-2 px-3 rounded-md border ${isMorningPeriod ? "border-green-500/20 font-medium text-green-500 bg-green-500/5" : " border-foreground/20"}`}>
                                Matin
                            </button>
                            <button
                                disabled={isToday && !now.isBetween(
                                    moment().set({ hour: 13, minute: 1, second: 0 }),
                                    moment().set({ hour: 16, minute: 30, second: 0 }),
                                    undefined,
                                    "[]"
                                )}
                                onClick={
                                    () => {
                                        setisMorningPeriod(false);
                                        setisAfternoonPeriod(true)
                                    }} className={` disabled:opacity-50 cursor-pointer  p-2 px-3 rounded-md border ${isAfternoonPeriod ? "border-green-500/20 font-medium text-green-500 bg-green-500/5" : " border-foreground/20"}`}>
                                Après-midi
                            </button>
                        </div>
                    }

                    <button disabled={isSubmiting} onClick={handleRefresh} className="bg-accent text-sm  p-2 font-medium px-3 flex items-center gap-2 rounded-md border border-foreground/15">
                        <RefreshCcw className="h-4 w-4" /> Actualiser
                    </button>
                    <div className="flex w-fit items-center relative gap-2 bg-background p-1 px-2 border rounded-md">

                        <p className="font-medium text-sm min-w-[200] flex gap-3  ">
                            <i className="bi bi-calendar-range"></i>
                            <span className="text-chart-3"> {moment(date, "D-M-yyyy").format("dddd DD/MM/YYYY")} - {moment().format("HH:mm a")}</span>
                        </p>
                        <button
                            className=" p-1 cursor-pointer bg-sidebar border opacity-70 hover:opacity-100 duration-200 border-foreground/10 rounded-sm  "
                            onClick={() => setCalendarOpen(true)}
                        ><Wrench className="w-5 h-5 stroke-1" /></button>
                        <AnimatePresence>
                            {calendarOpen &&
                                <motion.div
                                    ref={CalendarDayRef}
                                    initial={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10, x: 10 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute z-[10] w-[300] right-0 top-0  shadow-lg rounded-lg  overflow-hidden"
                                >
                                    <Calendar
                                        classNames={""}
                                        locale={"fr"}
                                        day={date}
                                        onSelect={d => {
                                            setDate(d);
                                            setCalendarOpen(false)
                                        }}
                                    />
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {
                !isMobile &&
                <CustomTable2
                    headers={headers}
                    rows={rows}
                    enableAddElem={false}
                    limit={null}
                    enableDaySeleted={false}
                    enableFilterButton={false}
                    enableSearch={false}
                    enableSort={false}
                    containerClassName={"!min-h-[200]  !pt-0 !p-0 "}
                    tableContainerClassName="min-h-none hidden md:block"
                    isLoading={isLoading}
                />
            }
            {
                isMobile &&
                <div className="flex mt-10 flex-col md:hidden  gap-3">
                    {
                        AttendanceChekingList
                            ?.filter((a) => {
                                if (Search === "") return true;
                                const searchLower = Search.toLowerCase();
                                const aName = a.firstName.toLowerCase();

                                // Replace any vowel in the search with a "any vowel" group
                                const vowelFlex = searchLower.replace(/[aeiou]/g, "[aeiou]");

                                // Then make consonants fuzzy too (allow skipped letters)
                                const fuzzyPattern = new RegExp(
                                    vowelFlex.split("").join(".*?"),
                                    "i"
                                );

                                return fuzzyPattern.test(aName);
                            })
                            ?.map(i =>
                                <TableCardItem
                                    title={<div className="flex items-center font-semibold gap-2 text-lg "><img src={UserPic()} className="w-[30] h-[30] rounded-full" alt="" />{i.firstName} {i.lastName}</div>}
                                    entries={[
                                        <div className="flex gap-2 items-center">Grade:<p className="font-me">{i.grade_id?.name}</p></div>,
                                        <div className="flex flex-col gap-2 mt-2">
                                            Presence:
                                            <div className="grid grid-cols-1 gap-1">
                                                {
                                                    isMorningPeriod &&

                                                    <p
                                                        onClick={() => handleTogglePresense(i._id, "morning")}
                                                        className={`flex w-full font-semibold justify-center  gap-2 cursor-pointer rounded-md  border p-2 items-center ${i.presente == true
                                                            ? "bg-green-500/5 border-green-500/20 text-green-600"
                                                            : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                                                    >
                                                        <CheckBoxinput
                                                            onClick={() => handleTogglePresense(i._id, "morning")}
                                                            labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                                                            checked={i.presente == true}
                                                        />
                                                        matin
                                                    </p>
                                                }
                                                {
                                                    isAfternoonPeriod &&
                                                    <p
                                                        onClick={() => handleTogglePresense(i._id, "afternoon")}
                                                        className={`flex  w-full font-semibold  gap-2 justify-center cursor-pointer rounded-md border p-2 items-center ${i.presente == true
                                                            ? "bg-green-500/5 border-green-500/20 text-green-600"
                                                            : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                                                    >
                                                        <CheckBoxinput
                                                            onClick={() => handleTogglePresense(i._id, "afternoon")}
                                                            labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                                                            checked={i.presente == true}
                                                        />
                                                        après-midi
                                                    </p>
                                                }
                                            </div>
                                        </div>,
                                        <div>
                                            <SignatureErea
                                                disabled={i.presente == false}
                                                isSigned={AttendanceChekingList.find(ele => ele._id == i._id)?.signature != null}
                                                onSave={(svg) => handleSignature(i._id, svg)}
                                                data={i}
                                            />
                                        </div>,
                                        <div className={` cursor-pointer  mt-2 flex items-center justify-center gap-2 rounded-full font-medium  `}>
                                            {
                                                i.presente == false &&
                                                <>
                                                    <input onChange={e => handleUploadFIles(e, i._id)} type="file" className="hidden" id={`inpudtforjustification${i._id}`} />
                                                    <label htmlFor={`inpudtforjustification${i._id}`} className="px-3 p-2 w-full border border-foreground/10 rounded-md text-center">

                                                        {
                                                            i.justification == null ?
                                                                <>justification <i className="bi bi-file-earmark-arrow-up"></i></>
                                                                : <div className="text-green-500 truncate max-w-[200]">{i.justification?.name} <i className="bi bi-check2-circle"></i></div>
                                                        }
                                                    </label>
                                                </>
                                            }
                                        </div>,
                                        <button
                                            disabled={i.isSubmitingSelf}
                                            onClick={() => handleSubmitSingle(i)} className="flex justify-center mt-3 items-center gap-2 bg-foreground rounded-md text-background p-2 px-4 font-semibold">Soumettre
                                            {
                                                i.isSubmitingSelf
                                                    ? <Loader1 wh=" w-[15] h-[15]" />
                                                    : <i className="bi bi-arrow-right-circle"></i>
                                            }
                                        </button>

                                    ]}
                                />
                            )
                    }
                </div>
            }

            <div className="w-full mt-6 gap-2 md:gap-4 flex justify-end md:px-10 items-center">
                <Link href={"/attendance"} className={" items-center  text-sm  flex gap-2 p-[7] font-medium px-5 bg-accent border border-foreground/15 rounded-md"}>

                    <MoveLeft className="w-4 h-4" />
                    Retour
                </Link>
                {/* <Button onClick={handleSUBMIT} disabled={isSubmiting || SubmitedList.length == AttendanceChekingList.length} size="lg"
                    className={"w-[200] !py-4"}
                >
                    Submit tout
                    {
                        isSubmiting
                            ? <Loader1 />
                            : <i className="bi bi-arrow-right-circle"></i>
                    }
                </Button> */}
            </div>

        </div>

    )
}

export default page
