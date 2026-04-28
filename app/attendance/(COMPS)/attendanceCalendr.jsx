"use client";

import { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
} from "date-fns";
import { motion } from "framer-motion";
import moment from "moment";
import Dialog from "@/components/Global/Dialog";

const statuses = ["present", "absent", "late"];

const getRandomStatus = () => {
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateFakeData = (days) => {
    return days.map((day) => ({
        date: format(day, "yyyy-MM-dd"),
        status: getRandomStatus(),
        checkIn: "08:30",
        checkOut: "16:30",
    }));
};

export default function AttendanceCalendar({ _id, onClose }) {
    const [currentDate] = useState(new Date());

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    const attendanceData = generateFakeData(days);

    const getStatusColor = (status) => {
        switch (status) {
            case "present":
                return "bg-green-500";
            case "absent":
                return "bg-red-500";
            case "late":
                return "bg-yellow-400";
            default:
                return "bg-gray-300";
        }
    };
    const [selectedMonth, setselectedMonth] = useState(moment().format("M-YYYY"));
    console.log(selectedMonth);

    return (
        <Dialog backWhenClose={false} onClose={onClose} closeIfClickOutside={true}>
            <div className="p-4 bg-background  w-[600] rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">
                    {moment(selectedMonth, "M-YYYY").format("MMMM YYYY")}
                </h2>

                {/* Days header */}
                <div className="grid grid-cols-5 text-center mb-2 text-sm font-medium">
                    {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-5 gap-2">
                    {days.map((day, index) => {
                        const dayData = attendanceData[index];

                        return (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="relative h-20 p-2 rounded-xl border cursor-pointer hover:shadow-md transition"
                            >
                                <div className=" font-medium">
                                    {format(day, "d")}
                                </div>

                                {/* Status dot */}
                                <div
                                    className={`absolute bottom-2 left-2 w-3 h-3 rounded-full ${getStatusColor(
                                        dayData.status
                                    )}`}
                                />

                                {/* Tooltip info */}
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/70 text-white text-xs flex flex-col justify-center items-center rounded-xl transition">
                                    <span className="capitalize">{dayData.status}</span>
                                    <span>{dayData.checkIn} - {dayData.checkOut}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Dialog>
    );
}