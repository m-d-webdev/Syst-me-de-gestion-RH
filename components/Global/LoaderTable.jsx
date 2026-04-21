"use client"
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "../ui/table";

const LoaderTable = ({ table_name, rowsLength = 6 }) => {
    return (
        <div
            className={` pt-10 flex min-h-screen flex-col items-start   w-full p-4 px-10 bg-white  md:overflow-auto `}
        >
            <h1 className="font-semibold tracking-tight text-2xl">{table_name}</h1>

            <div className="w-full mt-4 flex items-center justify-between">
                <div className="flex  w-full max-w-[600]  gap-2 items-center">

                    <div className="mad:max-w-[300] w-full flex border border-border  gap-2 items-center p-2 rounded h-[43]  animate- ">
                        <div className="w-[20] rounded h-[20] bg-accent  "></div>
                        <div className="w-[160] rounded h-[20] bg-accent  "></div>

                    </div>



                    <Button className={"!h-[43] cursor-pointer !bg-white"}>
                        <div className="w-[60] rounded h-[20] bg-accent animate-pulse "></div>
                        <div className="w-[20] rounded h-[20] bg-accent animate-pulse "></div>
                    </Button>
                    <Button className={"!h-[43] cursor-pointer !bg-white"}>
                        <div className="w-[60] rounded h-[20] bg-accent animate-pulse "></div>
                        <div className="w-[20] rounded h-[20] bg-accent animate-pulse "></div>
                    </Button>



                </div>

                <Button className={"!h-[43] cursor-pointer !bg-black"}>
                    <div className="w-[20] rounded h-[20] bg-[#4b4b4b] animate-pulse "></div>
                    <div className="w-[80] rounded h-[20] bg-[#4b4b4b] animate-pulse "></div>
                </Button>


            </div>
            <div className="flex  w-full min-h-[65vh] flex-col ites-start justify-start">

                <Table className="mt-6 rounded-t-2xl  ">

                    <TableHeader>
                        <TableRow className="">
                            {Array(rowsLength).fill().map((c, i) => (
                                <TableHead
                                    key={i}
                                    className={`bg-[#F8F9FB]  text-black border border-border`}
                                >
                                    <div className="flex gap-2 items-center w-s">

                                        {i == 0 &&
                                            <div className="w-[20] rounded h-[20] bg-white border border-border  "></div>

                                        }
                                        <div className=" w-[50%] rounded h-[20] bg-[#0000003b] animate-pulse "></div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            Array(7).fill().map(i =>
                                <TableRow key={i} className={""}>
                                    {
                                        Array(rowsLength).fill().map((c, i) =>
                                            i == 0
                                                ? <TableCell className={"h-[50] flex gap-2 items-center"} >
                                                    <div className="w-[20] rounded h-[20] bg-white border border-border  "></div>

                                                    <div className="w-[160] rounded h-[20] bg-accent animate-pulse "></div>
                                                </TableCell>
                                                : i == rowsLength - 1
                                                    ? <TableCell className={"h-[50] flex gap-2"}>
                                                        <div className="w-[50] rounded h-[20] bg-accent animate-pulse "></div>
                                                        <div className="w-[50] rounded h-[20] bg-accent animate-pulse "></div>
                                                    </TableCell>
                                                    : <TableCell className={"h-[50]"}><div className="w-[70] rounded h-[25] bg-accent animate-pulse "></div></TableCell>
                                        )
                                    }

                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            <div className="w-full mt-8 flex items-end gap-2 justify-end">
                <div className="w-[50] h-[30] bg-accent animate-pulse "></div>
                <div className="w-[50] h-[30] bg-accent animate-pulse "></div>
                <div className="w-[50] h-[30] bg-accent animate-pulse "></div>
            </div>
        </div >
    )
}

export default LoaderTable
