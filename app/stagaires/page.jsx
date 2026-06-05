"use client"
import { GET_STAGAIRES } from "@/api/Employers/Stagiare";
import { GET_USERS } from "@/api/Employers/User";
import UsersFilter from "@/components/FilterPopups/UserFilter";
import CustomTable2 from "@/components/Global/CustomTable"
import MoreOptionsPresenceTableLine from "@/components/Popups/MoreOptionsProduct";
import MoreOptionsTrainer from "@/components/Popups/MoreOptionsTrainer";
import MoreOptionsUser from "@/components/Popups/MoreOptionsUser";
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { UseMainConext } from "@/contexts/MainContext";
import { employeesForTest, getRoleLabel, UserPic } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";

const page = () => {
  const { User } = UseMainConext()
  const [isLoading, setLoading] = useState(false);
  const [filterPopupOpen, setFitlerOpen] = useState(false);
  const [sortByPopupOpen, setSortByOpen] = useState(false);
  const [Users, setUsers] = useState([]);
  const [TotalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(
    {
      page: 1,
      limit: 10,
      department: null,
      grade_id: null,
      role: null,
      status: null,
      hireDate: null,
      division_id: null,
      service_id: null,
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

  const get_users = async () => {
    setLoading(true);
    const res = await GET_STAGAIRES({ ...filters });
    setUsers(res.data)
    setTotalPages(res.pagination.totalPages)
    setLoading(false);
  }
  useEffect(() => {
    setselections([])
    get_users()
  }, [filters]);


  const headers = [
    <div className="flex  pl-3 w-fit items-center justify-center gap-2">
      {/* <CheckBoxinput
        checked={!employeesForTest.some(p => !selections.includes(p._id)) && employeesForTest.length > 0}
        onClick={handleSelectAll}
      /> */}
      <p className="tracking-tight">Nom</p>
    </div>,
    <p className="tracking-tight">CIN</p>,
    <p className="tracking-tight">Email</p>,
    <p className="tracking-tight">Téléphone</p>,
    <p className="tracking-tight">Service</p>,
    <p className="tracking-tight">Date</p>,
    <p className="tracking-tight">Durée totale</p>,
    <p className="tracking-tight">Restant</p>,
    <p className="tracking-tight">Statu</p>,
    <p className="tracking-tight">Action</p>,
  ];

  let rows = Users?.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
      <TableCell className={"flex items-center gap-1 pl-2"}>
        {/* <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        /> */}
        <img src={UserPic()} className="w-6 h-6 object-cover rounded-full" alt="" />
        <p className="truncate max-w-[180]">
          {i.name} adasd
        </p>
      </TableCell>
      <TableCell><p className="font-medium max-w-[120] truncate">{i.cin}</p></TableCell>
      <TableCell><b className="font-medium">{i.email}</b></TableCell>
      <TableCell><b className="font-medium">{i.phone}</b></TableCell>
      <TableCell><p className="font-medium max-w-[200] truncate">{i?.service_id?.name ?? "--"}</p></TableCell>
      <TableCell><p className="font-medium text-xs">{moment(i.start_date).format("DD/MM/YYYY")} a {moment(i.end_date).format("DD/MM/YYYY")}</p></TableCell>
      <TableCell><p className="font-medium max-w-[200] truncate">{moment(i?.end_date).diff(moment(i?.start_date), 'days')} jour</p></TableCell>
      <TableCell className={"text-center"}>
        <p className="text-red-800">
          {moment(i?.end_date).diff(moment(), 'days')} jour
        </p>
      </TableCell>
      <TableCell>
        {
          (moment().isSameOrAfter(moment(i?.start_date, "YYYY-MM-DD")) &&
            moment().isSameOrBefore(moment(i?.end_date, "YYYY-MM-DD")))
            ? <p className="text-xs bg-yellow-500/10 text-yellow-600 border border-yellow-500/50 font-medium w-fit p-1 px-3 rounded-md">En cours</p>
            : <>
              {
                moment().isBefore(moment(i?.start_date, "YYYY-MM-DD"))
                  ? <p className="text-xs bg-red-500/10 text-red-600 border border-red-500/50 font-medium w-fit p-1 px-3 rounded-md">Non commencé</p>
                  : moment().isAfter(moment(i?.end_date, "YYYY-MM-DD")) && <p className="text-xs bg-green-500/10 text-green-600 border border-green-500/50 font-medium w-fit p-1 px-3 rounded-md">Terminé</p>
              }


            </>
        }

      </TableCell>


      <TableCell className={"text-center"}>
        <MoreOptionsTrainer onDelete={() => get_users()} data={i} />
      </TableCell>
    </TableRow >
  );

  return (

    <>
      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        hrefWhenClickAdd="/stagaires/ajouter"
        pageTitle="Stagaires"

        filterPopup={
          <UsersFilter
            filters={filters}
            setFilters={setFilters}
            onClose={() => setFitlerOpen(false)} />
        }

        setFitlerOpen={setFitlerOpen}
        isFitlerOpen={filterPopupOpen}
        setSortByOpen={setSortByOpen}
        isSortByOpen={sortByPopupOpen}
        sortByPopup={null}
        enableAddElem={User.role == "admin"}
        originalSearch={filters.search}
        onSearch={(s) => setFilters(pv => ({ ...pv, search: s }))}
        currentPage={filters.page}
        totalePages={TotalPages}
        limit={filters.limit}
        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />
    </>

  )
}

export default page
