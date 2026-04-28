import Dialog from "./Dialog";

export default function EmployeePopup({ employee, onClose }) {
    const {
        pic, firstName, lastName, email, phone,
        division, service, grade, status,
        hireDate, ppr, city
    } = employee;

    const formattedDate = new Date(hireDate).toLocaleDateString("fr-FR", {
        day: "numeric", month: "long", year: "numeric"
    });

    const statusColors = {
        "En congé": { bg: "bg-amber-100 px-5", text: "text-amber-800" },
        "Actif": { bg: "bg-green-100 px-5 ", text: "text-green-800" },
        "Suspendu": { bg: "bg-red-100 px-5", text: "text-red-800" },
    };
    const badge = statusColors[status] ?? { bg: "bg-gray-100", text: "text-gray-700" };

    return (
        <Dialog backWhenClose={false} containerClassName="w-[500]" onClose={onClose} closeIfClickOutside={true}>

            {/* Header */}
            <div className="relative bg-chart-1 px-6 rounded-md pt-6 pb-14">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-blue-300 uppercase tracking-widest">Fiche employée</p>
                        <p className="mt-1 text-lg font-medium text-blue-50">{firstName} {lastName}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge.bg} ${badge.text}`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Avatar row */}
            <div className="flex  items-center gap-4 px-6  mt-5 mb-3">
                <img
                    src={pic}
                    alt={`${firstName} ${lastName}`}
                    className="w-18 h-18 rounded-full border-4 border-background object-cover shrink-0"
                    style={{ width: 100, height: 100 }}
                />
                <div className="pb-1">
                    <p className="text-xs ">{grade}</p>
                    <p className="text-xs  mt-0.5">
                        PPR : <span className=" font-medium">{ppr}</span>
                    </p>
                </div>
            </div>

            {/* Fields */}
            <div className="px-6 pb-4 flex flex-col gap-2">
                <div className="flex bg-background border border-foreground/5 rounded-xl px-4 py-2.5 justify-between items-center">

                    <div className=" flex gap-3  items-center">
                        <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        <div className="flex flex-col items-start">
                            <p className="text-[11px] text-gray-400">Email</p>
                            <p className="text-sm  text-blue-600">{email}</p>
                        </div>
                    </div>
                    <a href={`mailto:${email} `} target="_blank" className="bg-accent text-sm gap-2 flex items-center p-2 rounded-sm   border border-foreground/10 opacity-70 hover:opacity-100 duration-200">
                        Envoyer un email
                        <i className="bi bi-send"></i>
                    </a>
                </div>

                <div className="flex bg-background border border-foreground/5 rounded-xl px-4 py-2.5 justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.66 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <div>
                            <p className="text-[11px] text-gray-400">Téléphone</p>
                            <p className="text-sm text-gray-800">{phone}</p>
                        </div>

                    </div>
                    <a href={`https://wa.me/${phone} `} target="_blank" className="bg-accent text-sm gap-2 flex items-center p-2 rounded-sm   border border-foreground/10 opacity-70 hover:opacity-100 duration-200">
                        Envoyer via WhatsApp
                        <i className="bi bi-whatsapp"></i>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-background border border-foreground/5 rounded-xl px-4 py-2.5">
                        <p className="text-[11px] text-gray-400">Ville</p>
                        <p className="text-sm font-medium text-gray-800">{city}</p>
                    </div>
                    <div className="bg-background border border-foreground/5 rounded-xl px-4 py-2.5">
                        <p className="text-[11px] text-gray-400">Date d'embauche</p>
                        <p className="text-sm font-medium text-gray-800">{formattedDate}</p>
                    </div>
                </div>

                <div className="border bg-background border-foreground/5   rounded-xl px-4 py-2.5">
                    <p className="text-[11px] text-gray-400">Division</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{division}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                        <p className="text-xs text-gray-500">Service : {service}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 px-6 pb-5">
                <button onClick={onClose} className="text-sm px-4 py-1.5 rounded-lg border bg-background">
                    Fermer
                </button>
                {/* <button className="text-sm px-4 py-1.5 rounded-lg border border-blue-400 bg-blue-50 text-blue-900 font-medium hover:bg-blue-100">
                    Voir plus
                </button> */}

            </div>
        </Dialog>
    );
}