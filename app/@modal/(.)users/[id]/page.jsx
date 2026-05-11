import EmployeePopup from "@/components/Global/UserData"


const page = async ({ params }) => {
    const { id } = await params
    return (
        <EmployeePopup id={id} />
    )
}

export default page
