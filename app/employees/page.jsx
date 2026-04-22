"use client"
import CustomTable2 from "@/components/Global/CustomTable"
import CheckBoxinput from "@/components/ui/CheckBoxinput";
import { TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
const employeesForTest = [
  {
    _id: 1,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Amina",
    lastName: "Benali",
    email: "amina.benali@commune.ma",
    phone: "+212600123456",
    department: "Technique",
    position: "Ingénieur civil",
    status: "Actif",
    hireDate: "2021-03-15",
    salary: 8500,
    city: "Agadir",
  },
  {
    _id: 2,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Youssef",
    lastName: "Erraji",
    email: "y.erraji@commune.ma",
    phone: "+212611987654",
    department: "Finance",
    position: "Comptable",
    status: "Actif",
    hireDate: "2020-11-02",
    salary: 7200,
    city: "Fès",
  },
  {
    _id: 3,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Sara",
    lastName: "Idrissi",
    email: "s.idrissi@commune.ma",
    phone: "+212622334455",
    department: "Commercial",
    position: "Responsable commercial",
    status: "En congé",
    hireDate: "2022-06-10",
    salary: 9000,
    city: "Casablanca",
  },
  {
    _id: 4,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Khalid",
    lastName: "Moussaoui",
    email: "k.moussaoui@commune.ma",
    phone: "+212633221100",
    department: "RH",
    position: "Responsable RH",
    status: "Actif",
    hireDate: "2019-01-25",
    salary: 10000,
    city: "Rabat",
  },
  {
    _id: 5,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Nadia",
    lastName: "Tazi",
    email: "n.tazi@commune.ma",
    phone: "+212644556677",
    department: "Support",
    position: "Support informatique",
    status: "Inactif",
    hireDate: "2018-09-17",
    salary: 6500,
    city: "Marrakech",
  },
  {
    _id: 6,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Omar",
    lastName: "El Fassi",
    email: "o.elfassi@commune.ma",
    phone: "+212655778899",
    department: "Technique",
    position: "Technicien réseau",
    status: "Actif",
    hireDate: "2023-02-01",
    salary: 5800,
    city: "Fès",
  },
  {
    _id: 7,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Fatima",
    lastName: "Zahraoui",
    email: "f.zahraoui@commune.ma",
    phone: "+212666112233",
    department: "Finance",
    position: "Contrôleur de gestion",
    status: "Actif",
    hireDate: "2021-07-19",
    salary: 7800,
    city: "Tanger",
  },
  {
    _id: 8,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Hamza",
    lastName: "Bennani",
    email: "h.bennani@commune.ma",
    phone: "+212677889900",
    department: "Commercial",
    position: "Agent commercial",
    status: "En congé",
    hireDate: "2020-04-08",
    salary: 6000,
    city: "Agadir",
  },

  // ─── NEW EMPLOYEES ───

  {
    _id: 9,
    pic: "https://i.pravatar.cc/150?img=9",
    firstName: "Imane",
    lastName: "Bouaziz",
    email: "i.bouaziz@commune.ma",
    phone: "+212688112244",
    department: "RH",
    position: "Assistante RH",
    status: "Actif",
    hireDate: "2022-01-12",
    salary: 5400,
    city: "Fès",
  },
  {
    _id: 10,
    pic: "https://i.pravatar.cc/150?img=10",
    firstName: "Reda",
    lastName: "Chakiri",
    email: "r.chakiri@commune.ma",
    phone: "+212699887766",
    department: "Technique",
    position: "Technicien maintenance",
    status: "Actif",
    hireDate: "2021-09-03",
    salary: 6100,
    city: "Meknès",
  },
  {
    _id: 11,
    pic: "https://i.pravatar.cc/150?img=11",
    firstName: "Salma",
    lastName: "Alaoui",
    email: "s.alaoui@commune.ma",
    phone: "+212677223344",
    department: "Finance",
    position: "Analyste financier",
    status: "Actif",
    hireDate: "2020-02-20",
    salary: 8200,
    city: "Casablanca",
  },
  {
    _id: 12,
    pic: "https://i.pravatar.cc/150?img=12",
    firstName: "Mehdi",
    lastName: "Ouali",
    email: "m.ouali@commune.ma",
    phone: "+212611223355",
    department: "Support",
    position: "Technicien IT",
    status: "Actif",
    hireDate: "2023-05-11",
    salary: 5700,
    city: "Rabat",
  },
  {
    _id: 13,
    pic: "https://i.pravatar.cc/150?img=13",
    firstName: "Hajar",
    lastName: "Berrada",
    email: "h.berrada@commune.ma",
    phone: "+212644112233",
    department: "Commercial",
    position: "Chargée clientèle",
    status: "En congé",
    hireDate: "2022-08-01",
    salary: 6200,
    city: "Tanger",
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
    <p className="tracking-tight">email</p>,
    <p className="tracking-tight">téléphone</p>,
    <p className="tracking-tight">département</p>,
    <p className="tracking-tight">poste</p>,
    <p className="tracking-tight">statut</p>,
    <p className="tracking-tight">date d'embauche</p>,
    // <p className="tracking-tight">salaire</p>,
    <p className="tracking-tight">ville</p>,
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
      <TableCell><b className="font-medium">{i.email}</b></TableCell>
      <TableCell><b className="font-medium">{i.phone}</b></TableCell>
      <TableCell><b className="font-medium">{i.department}</b></TableCell>
      <TableCell>{i.position}</TableCell>
      <TableCell>
        <p className={`w-fit text-sm font-medium p-1 ${i.status == "Actif" ? "bg-green-100/50 text-[#009e18] border-green-500" : "bg-red-100/50 text-[#d40000] border-red-400 "} border rounded-2xl px-2`}>
          {i.status}
        </p>
      </TableCell>
      <TableCell><b className="font-medium">{i.hireDate}</b>      </TableCell>
      {/* <TableCell></TableCell> */}


      <TableCell className={"flex items-center gap-2 w-fit pl-5"}>
        <b className="font-medium">{i.city}</b>

      </TableCell>
    </TableRow >
  );

  return (

    <>
      <CustomTable2
        headers={headers}
        rows={rows}
        isLoading={isLoading}
        hrefWhenClickAdd="/addUser"
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

        setLimit={l => setFilters(pv => ({ ...pv, limit: l }))}
        setPage={p => setFilters(pv => ({ ...pv, page: p }))}
      />
    </>

  )
}

export default page
