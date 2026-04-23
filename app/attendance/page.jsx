"use client"
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { employeesForTest } from "@/lib/utils";
import { useEffect, useState } from "react";
import AttendanceCalendar from "./(COMPS)/attendanceCalendr";

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
        <p className={`w-fit text-sm font-medium p-1 ${i.status == "Actif" ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          {i.status}
        </p>
      </TableCell>

      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.attendance[0]?.status == "Présent" ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          {i.attendance[0].status}
        </p>
      </TableCell>


    </TableRow >
  );

  return (

    <div className="">
      <div className="w-full flex p-10 justify-center items-center">
        <AttendanceCalendar />
      </div>

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

        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />
    </div>

  )
}

export default page
