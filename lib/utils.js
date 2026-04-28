import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const COPY_TEXT = (text) => {
  if (typeof (navigator) != "undefined") {
    navigator.clipboard.writeText(text)
  }
}

export const CompanyName = "RH agadir"


export const sidebarLinks = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: <i className="bi bi-menu-button-wide"></i>,
    iconOn: <i className="bi bi-menu-button-wide-fill"></i>,
  },
  {
    name: "Employés",
    href: "/employees",
    icon: <i className="bi bi-people"></i>,
    iconOn: <i className="bi bi-people-fill"></i>,
  },
  {
    name: "Départements",
    href: "/departments",
    icon: <i className="bi bi-buildings"></i>,
    iconOn: <i className="bi bi-buildings-fill"></i>,
  },
  {
    name: "Présence",
    href: "/attendance",
    icon: <i className="bi bi-calendar2-check"></i>,
    iconOn: <i className="bi bi-calendar2-check-fill"></i>,
  },
  {
    name: "Congés",
    href: "/leave",
    icon: <i className="bi bi-alarm"></i>,
    iconOn: <i className="bi bi-alarm-fill"></i>,
  },
  {
    name: "Certificats",
    href: "/certificates",
    icon: <i className="bi bi-file-text"></i>,
    iconOn: <i className="bi bi-file-text-fill"></i>,
  },
  {
    name: "Rapports",
    href: "/reports",
    icon: <i className="bi bi-clipboard-data"></i>,
    iconOn: <i className="bi bi-clipboard-data-fill"></i>,
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: <i className="bi bi-gear"></i>,
    iconOn: <i className="bi bi-gear-fill"></i>,
  },
];

export const employeesForTest = [
  {
    _id: 1,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Amina",
    lastName: "Benali",
    email: "amina.benali@commune.ma",
    phone: "+212600123456",
    division: "Urbanisme",
    service: "Autorisations d'urbanisme",
    grade: "Ingénieur d'État 1er grade ",
    status: "Actif",
    hireDate: "2021-03-15",
    ppr: 8505648580,
    city: "Agadir"
  },
  {
    _id: 2,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Youssef",
    lastName: "Erraji",
    email: "y.erraji@commune.ma",
    phone: "+212611987654",
    division: "Finances",
    service: "Budget",
    grade: "Administrateur 2ème grade ",
    status: "Actif",
    hireDate: "2020-11-02",
    ppr: 7205648580,
    city: "Fès"
  },
  {
    _id: 3,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Sara",
    lastName: "Idrissi",
    email: "s.idrissi@commune.ma",
    phone: "+212622334455",
    division: "Affaires sociales et culturelles",
    service: "Affaires culturelles",
    grade: "Attaché d'administration 1er grade",
    status: "En congé",
    hireDate: "2022-06-10",
    ppr: 9005648580,
    city: "Casablanca"
  },
  {
    _id: 4,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Khalid",
    lastName: "Moussaoui",
    email: "k.moussaoui@commune.ma",
    phone: "+212633221100",
    division: "Ressources humaines",
    service: "Gestion du personnel",
    grade: "Chef de service",
    status: "Actif",
    hireDate: "2019-01-25",
    ppr: 10005648580,
    city: "Rabat"
  },
  {
    _id: 5,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Nadia",
    lastName: "Tazi",
    email: "n.tazi@commune.ma",
    phone: "+212644556677",
    division: "Systèmes d'information",
    service: "informatique",
    grade: "Technicien 2ème grade ",
    status: "Inactif",
    hireDate: "2018-09-17",
    ppr: 6505648580,
    city: "Marrakech"
  },
  {
    _id: 6,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Omar",
    lastName: "El Fassi",
    email: "o.elfassi@commune.ma",
    phone: "+212655778899",
    division: "Travaux et maintenance",
    service: "Maintenance réseau",
    grade: "Technicien 3ème grade ",
    status: "Actif",
    hireDate: "2023-02-01",
    ppr: 5805648580,
    city: "Fès"
  },
  {
    _id: 7,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Fatima",
    lastName: "Zahraoui",
    email: "f.zahraoui@commune.ma",
    phone: "+212666112233",
    division: "Finances",
    service: "Contrôle de gestion",
    grade: "Administrateur 1er grade",
    status: "Actif",
    hireDate: "2021-07-19",
    ppr: 7805648580,
    city: "Tanger"
  },
  {
    _id: 8,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Hamza",
    lastName: "Bennani",
    email: "h.bennani@commune.ma",
    phone: "+212677889900",
    division: "Affaires commerciales",
    service: "Relation client",
    grade: "Agent de service",
    status: "En congé",
    hireDate: "2020-04-08",
    ppr: 6005648580,
    city: "Agadir"
  },
  {
    _id: 9,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Imane",
    lastName: "Bouaziz",
    email: "i.bouaziz@commune.ma",
    phone: "+212688112244",
    division: "Ressources humaines",
    service: "Gestion du personnel",
    grade: "Attaché d'administration 2ème grade ",
    status: "Actif",
    hireDate: "2022-01-12",
    ppr: 5405648580,
    city: "Fès"
  },
  {
    _id: 10,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Reda",
    lastName: "Chakiri",
    email: "r.chakiri@commune.ma",
    phone: "+212699887766",
    division: "Travaux publics",
    service: "Maintenance et équipements",
    grade: "Technicien 2ème grade ",
    status: "Actif",
    hireDate: "2021-09-03",
    ppr: 6105648580,
    city: "Meknès"
  },
  {
    _id: 11,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Salma",
    lastName: "Alaoui",
    email: "s.alaoui@commune.ma",
    phone: "+212677223344",
    division: "Finances",
    service: "Recettes et fiscalité",
    grade: "Administrateur 2ème grade ",
    status: "Actif",
    hireDate: "2020-02-20",
    ppr: 8205648580,
    city: "Casablanca"
  },
  {
    _id: 12,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Mehdi",
    lastName: "Ouali",
    email: "m.ouali@commune.ma",
    phone: "+212611223355",
    division: "Systèmes d'information",
    service: "Support informatique",
    grade: "Technicien 3ème grade" ,
    status: "Actif",
    hireDate: "2023-05-11",
    ppr: 5705648580,
    city: "Rabat"
  },
  {
    _id: 13,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Hajar",
    lastName: "Berrada",
    email: "h.berrada@commune.ma",
    phone: "+212644112233",
    division: "Affaires sociales",
    service: "Action sociale",
    grade: "Adjoint administratif 2ème grade ",
    status: "En congé",
    hireDate: "2022-08-01",
    ppr: 6205648580,
    city: "Tanger"
  },
  {
    _id: 14,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Yassine",
    lastName: "El Amrani",
    email: "y.elamrani@commune.ma",
    phone: "+212633998877",
    division: "Urbanisme",
    service: "Suivi des chantiers",
    grade: "Ingénieur d'État principal",
    status: "Actif",
    hireDate: "2019-06-15",
    ppr: 11005648580,
    city: "Agadir"
  },
  {
    _id: 15,
    pic: "https://i.pinimg.com/1200x/1c/85/2e/1c852ea928150dfcf54c5457dbca0a35.jpg",
    firstName: "Noura",
    lastName: "Kabbaj",
    email: "n.kabbaj@commune.ma",
    phone: "+212622445566",
    division: "Environnement",
    service: "Hygiène et propreté",
    grade: "Agent de service",
    status: "Actif",
    hireDate: "2021-12-01",
    ppr: 5005648580,
    city: "Marrakech"
  },
  {
    _id: 16,
    pic: "https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg",
    firstName: "Karim",
    lastName: "Sbai",
    email: "k.sbai@commune.ma",
    phone: "+212655112299",
    division: "Affaires juridiques",
    service: "Contentieux",
    grade: "Rédacteur 1er grade ",
    status: "Actif",
    hireDate: "2018-03-22",
    ppr: 8805648580,
    city: "Rabat"
  }
];