"use client"
import { GET_DIVISIONS } from "@/api/Division";
import CreateDivisionForm from "@/components/Popups/CreateDivision";
import { Button } from "@/components/ui/button";
import { Plus, UserKey } from "lucide-react";
import { useEffect, useState } from "react";
import DivisionCard, { DivisionCardSkeleton } from "../../components/cards&loadingCards/DivisionsCard"



export default function page() {
  const [divisions, setDivisions] = useState([]);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [Loading, setLoading] = useState(true);

  const LoadDivisions = async () => {
    setLoading(true)
    setAddPopupOpen(false)
    const res = await GET_DIVISIONS();
    setDivisions(res.data);
    setLoading(false)
  };

  useEffect(() => {
    LoadDivisions();
  }, [])
  return (
    <div className="px-6 w-full  py-10">
      <div className=" mx-auto w-full max-w-[1200]">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between w-full ">
          <h1 className="text-xl flex gap-2 font-semibold items-center  "><i className="bi bi-buildings-fill"></i> Divisions</h1>
          <Button onClick={() => setAddPopupOpen(true)}><Plus /> Créer une division</Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Loading
            ? [1, 1, 1, 1, 1].map((i, ind) => <DivisionCardSkeleton ind={ind} />)
            : divisions?.map((division) => (
              <DivisionCard key={division.id} division={division} onToggle={() => { }} />
            ))
          }
        </div>
      </div>
      {
        isAddPopupOpen &&
        <CreateDivisionForm onUpdate={() => LoadDivisions()} onClose={() => setAddPopupOpen(false)} />
      }
    </div>
  );
}