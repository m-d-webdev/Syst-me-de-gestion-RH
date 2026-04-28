"use client"
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { employeesForTest } from "@/lib/utils";
import { useEffect, useState } from "react";
import AttendanceCalendar from "./(COMPS)/attendanceCalendr";
import MoreOptionsPresenceTableLine from "@/components/Popups/MoreOptionsProduct";
import moment from "moment";

const attendanceForOneDay = [
  {
    _id: 1,
    userId: 1,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:55",
    checkOut: "17:10",
    late: false,
    note: ""
  },
  {
    _id: 2,
    userId: 2,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "09:10",
    checkOut: "17:05",
    late: true,
    note: "Retard léger"
  },
  {
    _id: 3,
    userId: 3,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:40",
    checkOut: "17:20",
    late: false,
    note: ""
  },
  {
    _id: 4,
    userId: 4,
    date: "2026-04-28",
    status: "absent",
    justification: null,
    checkIn: null,
    checkOut: null,
    late: false,
    note: "Maladie"
  },
  {
    _id: 5,
    userId: 5,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:50",
    checkOut: "17:00",
    late: false,
    note: ""
  },
  {
    _id: 6,
    userId: 6,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "09:25",
    checkOut: "17:15",
    late: true,
    note: "Retard important"
  },
  {
    _id: 7,
    userId: 7,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:30",
    checkOut: "17:30",
    late: false,
    note: ""
  },
  {
    _id: 8,
    userId: 8,
    date: "2026-04-28",
    status: "absent",
    justification: "non_justifie",
    checkIn: null,
    checkOut: null,
    late: false,
    note: "Absence non signalée"
  },
  {
    _id: 9,
    userId: 9,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:45",
    checkOut: "17:05",
    late: false,
    note: ""
  },
  {
    _id: 10,
    userId: 10,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "09:05",
    checkOut: "17:00",
    late: true,
    note: "Retard"
  },
  {
    _id: 11,
    userId: 11,
    date: "2026-04-28",
    status: "absent",
    justification: "justifie",
    checkIn: null,
    checkOut: null,
    late: false,
    note: "Congé annuel"
  },
  {
    _id: 12,
    userId: 12,
    date: "2026-04-28",
    status: "present",
    justification: null,
    checkIn: "08:35",
    checkOut: "17:25",
    late: false,
    note: ""
  }
];

const page = () => {
  const [isLoading, setLoading] = useState(true);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
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


  const Get_Data = async () => {
    setLoading(true)
    attendanceForOneDay.map(i => {

      setAttendanceList(pv => {
        const user = employeesForTest.find(em => em._id == i.userId)
        return ([...pv, { ...i, user }])
      })
    });

    setLoading(false)
  };

  useEffect(() => {
    Get_Data();
  }, [])

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
    <p className="tracking-tight">Division</p>,
    <p className="tracking-tight">Service</p>,
    <p className="tracking-tight">Grade</p>,
    // <p className="tracking-tight">statut</p>,
    <p className="tracking-tight">présence</p>,
    <p className="tracking-tight">présence</p>,
    <p className="tracking-tight">Action</p>,
  ];

  let rows = attendanceList?.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/10 " : ""} `} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>

        <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        />


        <p className="max-w-[200] flex items-center gap-2  truncate">
          <img src={i.user?.pic} className="w-7 h-7 object-cover rounded-full" alt="" />
          {i.user?.firstName} {i.user?.lastName}
        </p>

      </TableCell>
      <TableCell><p className="">{i.user?.division}</p></TableCell>
      <TableCell><p className="">{i.user?.service}</p></TableCell>
      <TableCell>{i.user?.grade}</TableCell>

      <TableCell>
        <p className={`w-fit flex gap-2 text-sm  p-1 ${i.status == "present" ? "bg-green-100/10 text-[#009e18] border-green-500" : "bg-red-100/10 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          {i.status == "present" ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
          {i.status}
        </p>
      </TableCell>

      <TableCell>

        {
          i.status != "present" ?
            <p className={`w-fit flex items-center gap-1 text-sm  p-1 ${i.justification != null ? "bg-green-100/10 text-[#009e18] border-green-500" : "bg-red-100/10 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
              {
                i.justification != null
                && <i class="bi bi-file-earmark-check"></i>
              }
              {
                i.justification != null
                  ? "Justifie" : <b className="font-semibold">non justifie</b>
              }

            </p> : " --- "
        }
      </TableCell>
      <TableCell className={"text-center"}>
        <MoreOptionsPresenceTableLine data={i} />
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
      {/* { HistoryAttendanceOpen  &&
        <AttendanceCalendar />
      } */}
    </div>

  )
}

export default page
