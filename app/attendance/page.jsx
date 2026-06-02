"use client";


import CustomTable2 from "@/components/Global/CustomTable";

import CheckBoxinput from "@/components/ui/CheckBoxinput";

import { TableCell, TableRow } from "@/components/ui/table";

import { employeesForTest, UserPic } from "@/lib/utils";

import { useEffect, useState } from "react";

import MoreOptionsPresenceTableLine from "@/components/Popups/MoreOptionsProduct";

import moment from "moment";
import { GET_ATTENDANCES } from "@/api/Attendance";
import { UseMainConext } from "@/contexts/MainContext";
import Dialog from "@/components/Global/Dialog";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import UsersFilter from "@/components/FilterPopups/UserFilter";

function isStartWithPresenteFunc(str) {
  if (str.startsWith("absent")) {
    return false
  }
  else if (str.startsWith("present")) {
    return true
  }
}
function getAttendanceLabel(status, p) {
  const labels = {
    present: "Présent toute la journée",
    absent: "Absent toute la journée",
    absent_afternoon: "Absent l'après-midi",
    present_this_morning: "Présent ce matin",
    absent_this_morning: "Absent ce matin",
    absent_morning: "Absent le matin",
    present_morning_only: "Présent le matin uniquement",
    present_afternoon_only: "Présent l'après-midi uniquement",
    absent_morning_only: "Absent le matin uniquement",
    absent_afternoon_only: "Absent l'après-midi uniquement",
  };
  const labels2 = {
    present: "Présent",
    absent: "Absent ",
    absent_afternoon: "Absent l'après-midi",
    present_this_morning: "Présent",
    absent_this_morning: "Absent",
    absent_morning: "Absent",
    present_morning_only: "Présent",
    present_afternoon_only: "Absent",
    absent_morning_only: "Absent",
    absent_afternoon_only: "Présent",
  };
  const labels3 = {
    present: "Présent",
    absent: "Absent",
    absent_afternoon: "Absent",
    present_this_morning: "Présent ce matin",
    absent_this_morning: "Absent ce matin",
    absent_morning: "Absent",
    present_morning_only: "Absent",
    present_afternoon_only: "Présent",
    absent_morning_only: "Présent",
    absent_afternoon_only: "Absent",
  };

  return p == null ? labels[status] : p == "morning" ? labels2[status] : labels3[status] || "Statut inconnu";
}

const page = () => {
  const { User } = UseMainConext()
  const [isLoading, setLoading] = useState(true);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [isExpandSignatureOpen, setisExpandSignatureOpen] = useState(null);
  const [filters, setFilters] = useState(
    {
      userId: null,
      service_id: null,
      division_id: null,
      office_id: null,
      grade_id: null,
      role: null,
      cin: null,
      page: 1,
      limit: 10,
      date: moment().format("D-M-yyyy"),
      period: null,
      search: ""
    }
  );
  const isToday = moment(filters.date, "D-M-YYYY").isSame(moment(), "day");

  const now = moment();

  const handleChangePeriod = per => {
    setFilters(pv => ({ ...pv, period: per }))
  }
  const [selections, setselections] = useState([])

  const Get_Data = async () => {
    setLoading(true);
    const res = await GET_ATTENDANCES({ ...filters });
    setAttendanceList(res.data ?? [])
    setTotalPages(res.totalPages)
    setLoading(false)
  };


  useEffect(() => {
    setselections([]);
    Get_Data();
  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      <p className="tracking-tight">Nom</p>
    </div>,
    <p className="tracking-tight">Service</p>,
    <p className="tracking-tight">Grade</p>,
    // <p className="tracking-tight">statut</p>,
    <p className="tracking-tight">Présence</p>,
    <p className="tracking-tight">Signature</p>,
    <p className="tracking-tight">Justification</p>,
    <p className="tracking-tight">Action</p>,
  ];
  function SignatureCell({ svgString }) {
    // Replace width/height attrs but keep viewBox untouched
    const scaled = svgString
      .replace(/width="[^"]+"/, 'width="auto"')
      .replace(/height="[^"]+"/, 'height="40"');

    return <div onClick={() => setisExpandSignatureOpen(svgString)} dangerouslySetInnerHTML={{ __html: scaled }} />;
  }



  let rows = attendanceList?.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/10 " : ""} `} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>


        <img src={UserPic()} className="w-7 h-7 object-cover rounded-full" alt="" />
        <p className="max-w-[150]  truncate">
          {i?.user?.firstName} {i?.user?.lastName}
        </p>

      </TableCell>
      <TableCell><p className="">{i?.user?.service_id?.name}</p></TableCell>
      <TableCell>{i?.user?.grade_id?.name}</TableCell>
      <TableCell >
        <p className={`w-fit font-medium flex gap-2 text-sm  p-1
         ${isStartWithPresenteFunc(i.dailyStatus) ? "bg-green-100/10 text-[#009e18] border-green-500"
            : "bg-red-100/30 text-[#d40000]  border-[2px] border-red-400 "
          } 
              border rounded-2xl px-2`}>
          {getAttendanceLabel(i.dailyStatus, filters.period)}
        </p>
      </TableCell>
      <TableCell >
        <div className="justify-center items-center p-1 px-2 rounded-md bg-white flex">
          {(i?.morning?.signature != null || i?.afternoon?.signature != null)
            ? SignatureCell({ svgString: JSON.parse(i?.morning?.signature != null ? i?.morning?.signature : i?.afternoon?.signature) })
            : <p className="text-black">Non signé</p>
          }
        </div>
      </TableCell>


      <TableCell>
        {
          i.dailyStatus != "present" ?

            <p className={`w-fit flex  items-center gap-1 text-sm  p-1 ${(i?.morning?.justification != null || i?.afternoon?.justification != null) ? "bg-green-100/10 text-[#009e18] font-medium border-green-500" : "bg-red-100/10 text-[#d40000] font-semibold border-[2px] border-red-400 "} border rounded-2xl px-2`}>
              {
                i?.morning?.justification != null
                  ? <a download={true} target="_blank" href={i?.morning?.justification}>Justifié <i className="bi bi-file-earmark-check"></i></a>
                  : i?.afternoon?.justification != null
                    ? <a download={true} target="_blank" href={i?.afternoon?.justification}>Justifié <i className="bi bi-file-earmark-check"></i></a>
                    : <>Non justifié <i className="bi bi-ban"></i></>
              }
            </p>

            : <p className="opacity-60">Présent</p>
        }
      </TableCell>

      <TableCell className={"text-center"}>
        <MoreOptionsPresenceTableLine data={i} />
      </TableCell>


    </TableRow >
  );

  return (

    <div className="w-full pt-10">
      {/* <AttendanceCalendar /> */}

      <div className="w-full text-xs flex px-4 gap-4  items-center justify-end">

        <div
          className="flex text-xs mr-3  items-center"
        >
          <button onClick={() => {
            handleChangePeriod("morning")
          }

          } className={` cursor-pointer  p-2 px-3 rounded-l-md border ${filters.period == "morning" ? "border-foreground/20 opacity-100 font-medium text-green-500 bg-green-500/5" : " opacity-70 border-foreground/20"} duration-150 !border-r-transparent`}>
            Matin
          </button>
          <button
            disabled={isToday && !now.isBetween(
              moment().set({ hour: 13, minute: 1, second: 0 }),
              moment().set({ hour: 16, minute: 30, second: 0 }),
              undefined,
              "[]"
            )}
            onClick={() => {
              handleChangePeriod("afternoon")
            }}
            className={` !text-nowrap disabled:opacity-50  cursor-pointer  p-2 px-3 rounded-none border ${filters.period == "afternoon" ? "border-foreground/20 opacity-100 font-medium text-green-500 bg-green-500/5" : " opacity-70 border-foreground/20"} duration-150 !border-l-transparent !border-r-transparent`}>
            Après-midi
          </button>
          <button
            onClick={() => {
              handleChangePeriod(null)
            }}
            className={` disabled:opacity-50 cursor-pointer  p-2 px-3 rounded-r-md border ${filters.period == null ? "border-foreground/20 opacity-100 font-medium text-green-500 bg-green-500/5" : " opacity-70 border-foreground/20"} duration-150 !border-l-transparent`}>
            Tout le jour
          </button>
        </div>
        {
          ["hr_agent", "admin",].includes(User.role) &&
          <button
            onClick={() => { setselections([]); Get_Data(); }}
            className="flex text-xs items-center gap-1 p-2 rounded-md bg-accent border border-foreground/20">

            <RefreshCcw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />

            Actualiser
          </button>
        }
        <Link
          className="bg-chart-1  text-xs font-medium p-2 rounded-md   text-white flex items-center gap-2"
          href={"/attendance/mark-attendance"}>
          <i className="bi bi-calendar-plus"></i>
          Remplir la liste de présence
        </Link>
      </div>

      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        pageTitle="Présence"
        enableAddElem={false}
        enableFilterButton={User.role == "admin"}
        enableSort={User.role == "admin"}
        filterPopup={
          <UsersFilter
            filters={filters}
            isAttendancePage={true}
            setFilters={setFilters}
            onClose={() => setFitlerOpen(false)}
          />
        }
        setFitlerOpen={setFitlerOpen}
        isFitlerOpen={filterPopupOpen}
        setSortByOpen={setSortByOpen}
        originalSearch={filters.search}
        onSearch={(s) => setFilters(pv => ({ ...pv, search: s }))}
        currentPage={filters.page}
        totalePages={TotalPages}
        limit={filters.limit}
        enableDaySeleted={true}
        day={filters.date}
        containerClassName="!pt-0"
        NoResultDescription="Aucune donnée de présence n’est disponible pour le moment. Veuillez ajouter des enregistrements ou réessayer plus tard"
        NoResultText="Aucune présence enregistrée"
        setDay={d => setFilters(pv => ({ ...pv, date: d }))}
        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />

      {isExpandSignatureOpen != null &&
        <Dialog
          closeIfClickOutside={true}
          onClose={() => setisExpandSignatureOpen(null)}
        >

          <div
            onClick={() => setisExpandSignatureOpen(null)}
            dangerouslySetInnerHTML={{ __html: isExpandSignatureOpen }}
          />;

        </Dialog>
      }
    </div>

  )
}

export default page
