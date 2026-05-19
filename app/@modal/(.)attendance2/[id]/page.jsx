// import EmployeePopup from "@/components/Global/UserData"

import AttendanceModel from "../(comps)/AttendanceModel"


const page = async ({ params }) => {
    const { id } = await params
    return (
        <AttendanceModel userId={id} />
    )
}

export default page
