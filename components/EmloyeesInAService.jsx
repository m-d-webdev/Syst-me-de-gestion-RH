"use client";

import { GET_USERS } from "@/api/Employers/User";
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { employeesForTest, getRoleLabel } from "@/lib/utils";
import { ChevronRight, Home, MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const EmloyeesInAService = ({ service_id }) => {

    const [isLoading, setLoading] = useState(false);
    const [filterPopupOpen, setFitlerOpen] = useState(false);
    const [sortByPopupOpen, setSortByOpen] = useState(false);
    const [users, setusers] = useState([]);
    const [TotalPages, setTotalPages] = useState([]);
    const [division, setDivision] = useState(null);
    const [service, setService] = useState(null);

    const [filters, setFilters] = useState(
        {
            page: 1,
            limit: 10,
            department: null,
            position: null,
            status: null,
            hireDate: null,
            salary: null,
            city: null,
        }
    );



    const [selections, setselections] = useState([])
    const handleSelectAll = () => {
        if (!users.some(p => !selections.includes(p._id))) {
            setselections([])
        } else {
            setselections(users.map(p => p._id))
        }
    };




    const GetUsers = async () => {
        setLoading(true);
        const res = await GET_USERS({ service_id });
        if (!res.data) {
            setLoading(false);
            return
        };

        setusers(res.data);
        setDivision(res.data[0]?.division_id)
        setService(res.data[0]?.service_id)
        setLoading(false);
    }
    useEffect(() => {
        GetUsers()
    }, [])

    useEffect(() => {

        setselections([])
    }, [filters]);


    const headers = [
        <div className="flex  pl-3 w-fit items-center justify-center gap-2">
            <CheckBoxinput
                checked={!users?.some(p => !selections.includes(p._id)) && users.length > 0}
                onClick={handleSelectAll}
            />
            <p className="tracking-tight">Nom</p>
        </div>,
        <p className="tracking-tight">email</p>,
        <p className="tracking-tight">téléphone</p>,
        <p className="tracking-tight">poste</p>,
        <p className="tracking-tight">Grade</p>,
        <p className="tracking-tight">statut</p>,
        // <p className="tracking-tight">Action</p>,
    ];

    let rows = users?.map((i, idx) =>
        <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
            <TableCell className={"flex truncate  items-center gap-3  pl-5"}>

                <CheckBoxinput
                    checked={selections.includes(i._id)}
                    onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
                />
                <p className="max-w-[200] flex items-center gap-1  truncate">
                    <img src={"https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"} className="w-7 h-7 object-cover rounded-full mr-1" alt="" />
                    {i.firstName} {i.lastName}
                </p>
            </TableCell>
            <TableCell>{i.email}</TableCell>
            <TableCell>{i.phone}</TableCell>
            <TableCell>{getRoleLabel(i.role)}</TableCell>
            <TableCell>{i?.grade_id?.name}</TableCell>
            <TableCell>
                <p className={`w-fit text-sm font-medium flex items-center gap-1 px-2 p-1 ${i.isActive == true ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
                    {i.isActive == true ? <>Actif <i className="bi bi-check-circle"></i></> : <><i className="bi bi-x-circle"></i> Inactif</>}
                </p>
            </TableCell>
            {/* <TableCell><b className="font-medium">{i.hireDate}</b></TableCell> */}

        </TableRow >
    );

    return (

        <>
            <div className="p-1 ml-5  px-2 bg-accent  border border-foreground/10 rounded-sm  text-nowrap flex items-center  ">
                <Link className="p-1 px-2   truncate  flex items-center" href={`/divisions`}>
                    <i className="bi bi-house"></i>
                    <ChevronRight className="w-4 h-4" />
                </Link>
                <Link className="p-1 px-2    truncate  flex items-center" href={`/divisions/${division?._id}`}> {division?.name} <ChevronRight className="w-4 h-4" /> </Link>
                <Link className="p-1 px-2     truncate  flex items-center " href={`/divisions/${division?._id}/${service?._id}`}>

                    {service?.name}
                </Link>
            </div>
            <CustomTable2
                headers={headers}
                rows={rows}
                isLoading={isLoading}
                enableAddElem={false}
                pageTitle="Employés"
                filterPopup={null}
                setFitlerOpen={setFitlerOpen}
                isFitlerOpen={filterPopupOpen}
                setSortByOpen={setSortByOpen}
                isSortByOpen={sortByPopupOpen}
                sortByPopup={null}
                originalSearch={filters.search}
                onSearch={(s) => setFilters(pv => ({ ...pv, search: s }))}
                currentPage={filters.page}
                totalePages={TotalPages}
                limit={filters.limit}
                NoResultText="Aucun employé assigné"
                NoResultDescription={"Aucun employé n’est actuellement affecté à ce service. Vous pouvez ajouter des employés pour assurer son bon fonctionnement."}
                setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
                setPage={p => setFilters(pv => ({ ...pv, page: p }))}
            />
        </>

    )
}

export default EmloyeesInAService
