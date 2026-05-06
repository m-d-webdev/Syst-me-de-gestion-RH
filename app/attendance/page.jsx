"use client"
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { employeesForTest, UserPic } from "@/lib/utils";
import { useEffect, useState } from "react";
import MoreOptionsPresenceTableLine from "@/components/Popups/MoreOptionsProduct";
import moment from "moment";
import { GET_ATTENDANCES } from "@/api/Attendance";
import { UseMainConext } from "@/contexts/MainContext";


const page = () => {
  const { User } = UseMainConext()
  const [isLoading, setLoading] = useState(true);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [TotalPages, setTotalPages] = useState([]);
  const [firstTime, setfirstTime] = useState(false);
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
      date: moment().format("D-M-yyyy"),
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
    setLoading(true);
    const res = await GET_ATTENDANCES({ ...filters });
    setAttendanceList(res.data ?? [])
    setLoading(false)
  };


  useEffect(() => {
    setselections([]);
    Get_Data();
  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      <CheckBoxinput
        checked={!employeesForTest.some(p => !selections.includes(p._id)) && employeesForTest.length > 0}
        onClick={handleSelectAll}
      />
      <p className="tracking-tight">Nom</p>
    </div>,
    <p className="tracking-tight">Service</p>,
    <p className="tracking-tight">Grade</p>,
    // <p className="tracking-tight">statut</p>,
    <p className="tracking-tight">présence</p>,
    <p className="tracking-tight">justification</p>,
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
          <img src={UserPic()} className="w-7 h-7 object-cover rounded-full" alt="" />
          {i?.user_id?.firstName} {i?.user_id?.lastName}
        </p>

      </TableCell>
      <TableCell><p className="">{i?.user_id?.service_id?.name}</p></TableCell>
      <TableCell>{i?.user_id?.grade_id?.name}</TableCell>

      <TableCell>
        <p className={`w-fit font-medium flex gap-2 text-sm  p-1 ${i.isPresente == true ? "bg-green-100/10 text-[#009e18] border-green-500" : "bg-red-100/30 text-[#d40000]  border-[2px] border-red-400 "} border rounded-2xl px-2`}>
          {/* {i.isPresente == true ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>} */}
          {
            i.isPresente == true
              ? <>Présent <i className="bi bi-check2-circle"></i></>
              : <>Absent <i className="bi bi-x-circle"></i></>
          }
        </p>
      </TableCell>
      <TableCell>
        {
          i.isPresente == false ?
            <p className={`w-fit flex  items-center gap-1 text-sm  p-1 ${i.justification != null ? "bg-green-100/10 text-[#009e18] font-medium border-green-500" : "bg-red-100/10 text-[#d40000] font-semibold border-[2px] border-red-400 "} border rounded-2xl px-2`}>
              {
                i.justification != null
                  ? <a download={true} target="_blank" href={i.justification}>Justifié <i className="bi bi-file-earmark-check"></i></a>
                  : <>Non justifié <i className="bi bi-ban"></i></>
              }

            </p> : <p className="opacity-60">Présent</p>
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
        hrefWhenClickAdd="/attendance/mark-attendance"
        pageTitle="Présence"
        enableFilterButton={User.role == "admin"}
        enableSort={User.role == "admin"}
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
        day={filters.date}
        NoResultDescription="Aucune donnée de présence n’est disponible pour le moment. Veuillez ajouter des enregistrements ou réessayer plus tard"
        NoResultText="Aucune présence enregistrée"
        setDay={d => setFilters(pv => ({ ...pv, date: d }))}
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
