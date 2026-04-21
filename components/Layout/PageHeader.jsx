"use client"
import { motion } from "framer-motion"
import { sidebarLinks } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function PageHeader() {
    const pathname = usePathname();

    const currentPage = sidebarLinks.find(
        (link) =>
            pathname === link.href ||
            pathname.startsWith(link.href + "/")
    );

    const pageName = currentPage?.name || "Page";
    const pageIcon = currentPage?.iconOn || "";

    return (
        <motion.div
            key={pageName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3  text-chart-1  min-w-[200]  items-center">

            {pageIcon}
            <h1 className="font-semibold tracking-tighter text-lg">
                {pageName}


            </h1>
        </motion.div>
    );
}