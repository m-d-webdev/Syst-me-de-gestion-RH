"use client"
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { employeesForTest } from "@/lib/utils";
import { useEffect, useState } from "react";
import AttendanceCalendar from "./(COMPS)/attendanceCalendr";
import MoreOptionsPresenceTableLine from "@/components/Popups/MoreOptionsProduct";
import moment from "moment";

const attendanceHistory = [
  {
    _id: 1,
    employeeId: 1,
    date: "2026-04-01",
    checkIn: "08:15",
    checkOut: "16:30",
    status: "Présent",
    justification: null,
  },
  {
    _id: 2,
    employeeId: 2,
    date: "2026-04-01",
    checkIn: "08:45",
    checkOut: "17:10",
    status: "Présent",
    justification: "Retard justifié",
  },
  {
    _id: 3,
    employeeId: 3,
    date: "2026-04-01",
    checkIn: null,
    checkOut: null,
    status: "En congé",
    justification: "Congé annuel",
  },
  {
    _id: 4,
    employeeId: 4,
    date: "2026-04-01",
    checkIn: null,
    checkOut: null,
    status: "Absent",
    justification: null,
  },

  // ---- DAY 2 ----
  {
    _id: 5,
    employeeId: 1,
    date: "2026-04-02",
    checkIn: "08:05",
    checkOut: "16:40",
    status: "Présent",
    justification: null,
  },
  {
    _id: 6,
    employeeId: 2,
    date: "2026-04-02",
    checkIn: null,
    checkOut: null,
    status: "Absent",
    justification: "Maladie",
  },
  {
    _id: 7,
    employeeId: 5,
    date: "2026-04-02",
    checkIn: "09:10",
    checkOut: "17:00",
    status: "Présent",
    justification: "Retard justifié",
  },
  {
    _id: 8,
    employeeId: 6,
    date: "2026-04-02",
    checkIn: "08:20",
    checkOut: "16:50",
    status: "Présent",
    justification: null,
  },

  // ---- DAY 3 ----
  {
    _id: 9,
    employeeId: 7,
    date: "2026-04-03",
    checkIn: "08:30",
    checkOut: "17:15",
    status: "Présent",
    justification: null,
  },
  {
    _id: 10,
    employeeId: 8,
    date: "2026-04-03",
    checkIn: null,
    checkOut: null,
    status: "Absent",
    justification: "Justifié",
  },
  {
    _id: 11,
    employeeId: 9,
    date: "2026-04-03",
    checkIn: "08:00",
    checkOut: "16:20",
    status: "Présent",
    justification: null,
  },
  {
    _id: 12,
    employeeId: 10,
    date: "2026-04-03",
    checkIn: "10:00",
    checkOut: "17:30",
    status: "Présent",
    justification: "Retard",
  },

  // ---- EDGE CASES ----
  {
    _id: 13,
    employeeId: 1,
    date: "2026-04-04",
    checkIn: "12:00",
    checkOut: "16:00",
    status: "Présent",
    justification: "Demi-journée",
  },
  {
    _id: 14,
    employeeId: 2,
    date: "2026-04-04",
    checkIn: null,
    checkOut: null,
    status: "Absent",
    justification: "Non justifié",
  },
  {
    _id: 15,
    employeeId: 3,
    date: "2026-04-04",
    checkIn: null,
    checkOut: null,
    status: "En congé",
    justification: "Congé maladie",
  },
];


const page = () => {
  const [isLoading, setLoading] = useState(false);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [TotalPages, setTotalPages] = useState([]);
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
      day: moment().format("D-M-yyyy"),
    }
  );



  const [selections, setselections] = useState([])
  const handleSelectAll = () => {
    if (!employeesForTest.some(p => !selections.includes(p._id))) {
      setselections([])
    } else {

      setselections(employeesForTest.map(p => p._id))
    }
  }


  useEffect(() => {
    setselections([])
  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      <CheckBoxinput
        checked={!employeesForTest.some(p => !selections.includes(p._id)) && employeesForTest.length > 0}
        onClick={handleSelectAll}
      />
      <p className="tracking-tight">Nom</p>
    </div>,
    <p className="tracking-tight">département</p>,
    <p className="tracking-tight">poste</p>,
    <p className="tracking-tight">statut</p>,
    <p className="tracking-tight">présence</p>,
    <p className="tracking-tight">présence</p>,
    <p className="tracking-tight">Action</p>,
  ];

  let rows = employeesForTest.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>

        <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        />
        <p className="max-w-[200] flex items-center gap-1  truncate">
          <img src={i.pic} className="w-7 h-7 object-cover rounded-full" alt="" />
          {i.firstName} {i.lastName}
        </p>
      </TableCell>
      <TableCell><b className="font-medium">{i.department}</b></TableCell>
      <TableCell>{i.position}</TableCell>
      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.status == "Actif" ? "text-[#009e18] " : i.status == "Inactif" ? " text-[#d40000] " : "text-yellow-500"} gap-1 flex items-center  rounded-2xl px-2`}>
          {i.status == "Actif" ? <i className="bi bi-check-circle "></i> :
            i.status == "Inactif" ? <i className="bi bi-x-circle"></i> : <i className="bi bi-stopwatch"></i>}
          {i.status}
        </p>
      </TableCell>

      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.attendance[0]?.status == "Présent" ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          {i.attendance[0].status}
        </p>
      </TableCell>

      <TableCell>
        <p className={`w-fit flex items-center gap-1 text-sm font-medium p-1 ${i.attendance[0]?.status == "Présent" ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          Justifie
          <i className="bi bi-check2"></i>
        </p>
      </TableCell>
      <TableCell className={"text-center"}>
        <MoreOptionsPresenceTableLine />
      </TableCell>


    </TableRow >
  );

  return (

    <div className="w-full">
      {/* <AttendanceCalendar /> */}

      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        hrefWhenClickAdd="/addUser"
        pageTitle="Présence"
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
        enableDaySeleted={true}
        day={filters.day}
        setDay={d => setFilters(pv => ({ ...pv, day: d }))}
        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />
    </div>

  )
}

export default page
