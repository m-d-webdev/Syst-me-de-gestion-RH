"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "../ui/table";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Input } from "../ui/input";
import { AnimatePresence } from "framer-motion";
import Pagination from "./Dots";


const CustomTable2 = ({
    headers = [],
    rows = [],
    containerClassName = "",
    totalePages = 1,
    setPage = () => { },
    limit = 10,
    setLimit = () => { },
    currentPage = 0,
    NoResultIcon = "",
    NoResultText = "",
    NoResultDescription,
    isLoading = false,
    headersClassName = "",
    pageTitle = "",
    enableSearch = true,
    enableFilterButton = true,
    enableSort = true,
    enableAddElem = true,
    hrefWhenClickAdd,
    filterPopup,
    isFitlerOpen,
    setFitlerOpen = () => { },
    sortByPopup,
    isSortByOpen,
    setSortByOpen = () => { },
    onSearch = () => { },
    originalSearch
}) => {
    try {

        const [search, setsearch] = useState(originalSearch);
        useEffect(() => {
            if (!search || search == "") {
                if (originalSearch != null && originalSearch != "") {
                    onSearch("")
                }
                return;
            };

            let t = setTimeout(() => {
                onSearch(search)
            }, 500)
            return () => {
                clearTimeout(t)
            }
        }, [search]);


        return (
            <>
                <div
                    className={`${containerClassName} pt-10 text-sm flex min-h-screen flex-col items-start   w-full p-4 px-10   md:overflow-auto `}
                >
                    <h1 className="font-semibold tracking-tight text-2xl">{pageTitle}</h1>

                    <div className="w-full mt-4 flex items-center justify-between">
                        <div className="flex  gap-2 items-center">
                            {enableSearch &&
                                <Input
                                    onChange={r => setsearch(r.target.value)}
                                    value={search}
                                    parentClassName=" !py-2  bg-background  border-foreground/15 md:w-[300]"
                                    icon={<Search className=" stroke-1 w-5 h-5" />}
                                    placeholder="Search ... "
                                />
                            }

                            {
                                enableFilterButton &&
                                <Button
                                    onClick={() => setFitlerOpen(pv => !pv)}
                                    variant={"outline"} className={" cursor-pointer "}>
                                    <i className="bi bi-funnel"></i>
                                    Filter
                                </Button>
                            }

                            {
                                enableSort &&
                                <Button onClick={() => setSortByOpen(pv => !pv)} variant={"outline"} className={"  cursor-pointer "}>
                                    <i className="bi bi-sort-alpha-down"></i>
                                    Sort
                                </Button>
                            }
                        </div>

                        {
                            enableAddElem &&
                            <>

                                {

                                    hrefWhenClickAdd
                                        ? <Link href={hrefWhenClickAdd} className={" py-2 flex items-center gap-1 text-nowrap font-medium bg-chart-1 text-white !px-3 rounded-md text-sm cursor-pointer"}  > <Plus className="stroke-1 w-5 h-5" /> Add  {pageTitle}</Link>
                                        : <Button className={"cursor-pointer"} variant={"dark"} > <Plus className="stroke-1 w-5 h-5" /> Add  {pageTitle}</Button>
                                }
                            </>
                        }

                    </div>
                    <div className="flex  w-full min-h-[65vh] flex-col ites-start justify-start">

                        <Table className="mt-6  rounded-t-2xl  ">

                            <TableHeader>
                                <TableRow className="">
                                    {headers.map((c, i) => (
                                        <TableHead
                                            key={i}
                                            className={`${headersClassName} bg-[#F8F9FB]  ${i == 0 ? "" : ""} text-black border border-border`}
                                        >
                                            {c}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <>
                                    {
                                        isLoading
                                            ?
                                            <>
                                                {
                                                    Array(5).fill().map(i =>
                                                        <TableRow key={i} className={""}>
                                                            {
                                                                Array(headers.length).fill().map((c, i) =>
                                                                    i == 0
                                                                        ? <TableCell className={"h-[50]   flex gap-2 items-center"} >
                                                                            <div className="w-[20] rounded h-[20] bg-background border border-border  "></div>
                                                                            <div className="w-full   rounded h-[20] bg-accent animate-pulse "></div>
                                                                        </TableCell>
                                                                        : <TableCell className={"h-[50]"}><div className=" rounded h-[25] bg-accent animate-pulse "></div></TableCell>
                                                                )
                                                            }

                                                        </TableRow>
                                                    )
                                                }
                                            </>
                                            : <>
                                                {
                                                    rows.length > 0 ? (
                                                        rows.map((r, i) => r)
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell
                                                                // colSpan={columns.length}
                                                                className="h-24 font-medium text-lg   text-center "
                                                                colSpan={headers?.length}
                                                            >
                                                                {!isLoading ?
                                                                    (
                                                                        <div className="w-full  flex flex-col p-10 gap-4 items-center justify-center">
                                                                            {React.isValidElement(NoResultIcon) && NoResultIcon}
                                                                            {NoResultText ? (
                                                                                <>
                                                                                    <h1 className="max-w-[600px] text-2xl text-[#1B3D50] font-medium text-center">
                                                                                        {NoResultText}
                                                                                    </h1>
                                                                                    <p className="max-w-[700px] text-[#1B3D50] text-center mt-2">
                                                                                        {NoResultDescription}
                                                                                    </p>
                                                                                </>
                                                                            ) : (
                                                                                <h1 className="max-w-[600px] text-2xl text-[#1B3D50] font-medium text-center">
                                                                                    No result
                                                                                </h1>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                    :
                                                                    <div className="w-full  flex flex-col p-10 gap-4 items-center justify-center">

                                                                        <h1 className="max-w-[600px] text-2xl text-[#1B3D50] font-medium text-center">
                                                                            No result </h1>
                                                                    </div>
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                            </>
                                    }
                                </>

                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-full flex items-center gap-2 justify-between">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">Showing </p>
                            <Select value={limit} onValueChange={v => { setLimit(v) }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {[10, 20, 50, 100, 500].map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Pagination onPageChange={p => setPage(p)} currentPage={currentPage} totalPages={totalePages} />
                    </div>
                </div>

                <AnimatePresence>
                    {(isFitlerOpen && React.isValidElement(filterPopup)) && filterPopup}
                    {(isSortByOpen && React.isValidElement(sortByPopup)) && sortByPopup}
                </AnimatePresence>
            </>
        );
    } catch (error) {
        return <>Error</>;
    }
};

export default CustomTable2;
