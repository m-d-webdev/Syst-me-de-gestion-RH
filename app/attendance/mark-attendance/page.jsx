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

const page = () => {


    const [isLoading, setLoading] = useState(true);
    const [isSubmiting, setisSubmiting] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [AttendanceChekingList, setAttendanceChekingList] = useState([]);
    const [date, setDate] = useState(moment().format("D-M-yyy"));
    const [SubmitedList, setSubmitedList] = useState([]);


    const Get_USERS = async () => {
        setLoading(true);
        const res = await GET_USERS();
        setAttendanceChekingList(res?.data?.map(u => ({ ...u, presente: true, presente_period: ["morning", "afternoon"], justification: null })))
        setLoading(false);
    };

    useEffect(() => {
        Get_USERS();
    }, []);

    console.log(AttendanceChekingList[0]);


    const handleTogglePresense = (id, period) => {
        setAttendanceChekingList(pv => pv.map(ele => ele._id == id
            ? {
                ...ele,
                presente_period: ele.presente_period?.includes(period)
                    ? ele.presente_period?.filter(pver =>
                        pver != period
                    )
                    : [...ele.presente_period, period]
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
                if (u.presente_period.length < 2 && u.justification != null) {

                    const formData = new FormData();
                    formData.append("user_id", u._id);
                    formData.append("date", date);

                    formData.append(
                        "presente_periods",
                        JSON.stringify(u.presente_period)
                    );

                    formData.append("justification", u.justification);
                    const res = await CREATE_ATTENDANCE(formData);

                    if (res.data) {
                        setSubmitedList((pv) => [...pv, u._id]);
                    };

                } else {
                    const { _id, presente_period } = u;
                    const res = await CREATE_ATTENDANCE({
                        user_id: _id,
                        date,
                        presente_periods: JSON.stringify(presente_period)
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


    const handleRefresh = () => {
        setSubmitedList([])
        setAttendanceChekingList(pv =>
            pv.map(
                ele => (
                    { ...ele, presente: true, presente_period: ["morning", "afternoon"], justification: null }
                )
            )
        );
    }
    // ====================
    const headers = [
        <div className="flex  pl-3 w-fit items-center justify-center gap-2">

            <p className="tracking-tight">Nom</p>
        </div>,
        <p className="tracking-tight">CIN</p>,
        <p className="tracking-tight">Grade</p>,
        <p className="tracking-tight">Présence</p>,
        <>
            {
                // AttendanceChekingList.some(i => i.presente == false) &&
                <p className="tracking-tight">Justification</p>
            }
        </>
    ];


    let rows = AttendanceChekingList?.map((i, idx) =>
        <TableRow className={`relative`} key={idx}>
            {
                SubmitedList?.includes(i._id) &&
                <div
                    className="bg-background/60 text-green-500 font-semibold  flex justify-center items-center w-full h-full  absolute top-0 right-0 z-[2]">
                    <p
                        style={{
                            backdropFilter: "blur(8px)"
                        }}
                        className="bg-background p-1 px-3 ">
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
            <TableCell><p className="">{i.cin ?? "---"}</p></TableCell>
            <TableCell><p className="">{i.grade_id?.name}</p></TableCell>
            <TableCell>
                <div className="flex gap-2 items-center "></div>
                <div className={`w-fit flex   items-center `}>
                    <p
                        onClick={() => handleTogglePresense(i._id, "morning")}
                        className={`flex font-semibold  gap-2 cursor-pointer rounded-l-2xl border p-2 items-center ${(i.presente_period?.includes("morning"))
                            ? "bg-green-500/5 border-green-500/20 text-green-600"
                            : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                    >
                        <CheckBoxinput
                            onClick={() => handleTogglePresense(i._id, "morning")}
                            labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                            checked={i.presente_period?.includes("morning")}
                        />
                        matin
                    </p>
                    <p
                        onClick={() => handleTogglePresense(i._id, "afternoon")}
                        className={`flex font-semibold  gap-2 cursor-pointer rounded-r-2xl border p-2 items-center ${((i.presente_period?.includes("afternoon")))
                            ? "bg-green-500/5 border-green-500/20 text-green-600"
                            : "bg-red-500/5 border-red-500/20 text-red-600"}`}
                    >
                        <CheckBoxinput
                            onClick={() => handleTogglePresense(i._id, "afternoon")}
                            labelClassName={"peer-checked:text-white peer-checked:bg-green-500"}
                            checked={(i.presente_period?.includes("afternoon"))}
                        />
                        après-midi
                    </p>
                </div>


            </TableCell>
            <TableCell>
                <div className={`!w-fit cursor-pointer flex items-center gap-2 rounded-full font-medium border  bg-sidebar  border-foreground/20 `}>
                    {
                        i.presente_period?.length < 2 &&
                        <>
                            <input onChange={e => handleUploadFIles(e, i._id)} type="file" className="hidden" id={`inpudtforjustification${i._id}`} />
                            <label htmlFor={`inpudtforjustification${i._id}`} className="px-3 p-1">

                                {
                                    i.justification == null ?
                                        <>justification <i className="bi bi-file-earmark-arrow-up"></i></>
                                        : <div className="text-green-500 truncate max-w-[200]">{i.justification?.name} <i className="bi bi-check2-circle"></i></div>
                                }
                            </label>
                        </>
                    }
                </div>

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
    return (

        <div className="w-full p-4">
            {/* <AttendanceCalendar /> */}
            <div className="flex gap-5 w-full pr-6 items-center justify-end">
                <button disabled={isSubmiting} onClick={handleRefresh} className="bg-accent text-sm  p-2 font-medium px-3 flex items-center gap-2 rounded-md border border-foreground/15">
                    <RefreshCcw className="h-4 w-4" /> Actualiser
                </button>
                <div className="flex w-fit items-center relative gap-2 bg-background p-1 px-2 border rounded-md">
                    <p className="font-medium text-sm min-w-[200] flex gap-3  ">
                        <i className="bi bi-calendar-range"></i>
                        <span className="text-chart-3"> {moment(date, "D-M-yyyy").format("dddd DD/MM/YYYY")}</span>
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
                                className="absolute z-3 w-[300] right-0 top-0  shadow-lg rounded-lg  overflow-hidden"
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
            <CustomTable2
                headers={headers}
                rows={rows}
                enableAddElem={false}
                enableDaySeleted={false}
                enableFilterButton={false}
                enableSearch={false}
                enableSort={false}
                containerClassName={"!min-h-[200]  !pt-0 !p-0 "}
                tableContainerClassName="min-h-none"
                isLoading={isLoading}
            />
            <div className="w-full  gap-4 flex justify-end px-10 items-center">
                <Link href={"/attendance"} className={" items-center  text-sm  flex gap-2 p-[7] font-medium px-5 bg-accent border border-foreground/15 rounded-md"}>

                    <MoveLeft className="w-4 h-4" />
                    Retour
                </Link>
                <Button onClick={handleSUBMIT} disabled={isSubmiting || SubmitedList.length == AttendanceChekingList.length} size="lg" className={"w-[150]"}>
                    Submit
                    {
                        isSubmiting
                            ? <Loader1 />
                            : <i className="bi bi-arrow-right-circle"></i>
                    }
                </Button>
            </div>

        </div>

    )
}

export default page
