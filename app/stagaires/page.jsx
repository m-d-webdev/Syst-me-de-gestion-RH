"use client"
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
    const res = await GET_USERS({ ...filters });
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
      <CheckBoxinput
        checked={!employeesForTest.some(p => !selections.includes(p._id)) && employeesForTest.length > 0}
        onClick={handleSelectAll}
      />
      <p className="tracking-tight">Nom</p>
    </div>,
    <p className="tracking-tight">CIN</p>,
    <p className="tracking-tight">Email</p>,
    <p className="tracking-tight">Téléphone</p>,
    <p className="tracking-tight">Division</p>,
    <p className="tracking-tight">Service</p>,
    <p className="tracking-tight">Action</p>,
  ];

  let rows = Users?.map((i, idx) =>
    <TableRow className={`${selections.includes(i._id) ? "bg-chart-1/2 " : ""}`} key={idx}>
      <TableCell className={"flex truncate  items-center gap-3  pl-5"}>
        <CheckBoxinput
          checked={selections.includes(i._id)}
          onClick={() => setselections(pv => pv.includes(i._id) ? pv.filter(item => item != i._id) : [...pv, i._id])}
        />
        <p className="max-w-[200] flex items-center gap-1  truncate">
          <img src={UserPic()} className="w-7 h-7 object-cover rounded-full" alt="" />
          {i.firstName} {i.lastName}
        </p>
      </TableCell>
      <TableCell><p className="font-medium max-w-[120] truncate">{"--"}</p></TableCell>
      <TableCell><b className="font-medium">{i.email}</b></TableCell>
      <TableCell><b className="font-medium">{i.phone}</b></TableCell>
      <TableCell><p className="font-medium max-w-[150] truncate">{i?.division_id?.name ?? "--"}</p></TableCell>
      <TableCell><p className="font-medium max-w-[150] truncate">{i?.service_id?.name ?? "--"}</p></TableCell>
      
      <TableCell className={"text-center"}>
        <MoreOptionsTrainer data={i} />
      </TableCell>
    </TableRow >
  );

  return (

    <>
      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        hrefWhenClickAdd="/addTraining"
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
