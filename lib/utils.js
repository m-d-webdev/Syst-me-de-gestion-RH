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