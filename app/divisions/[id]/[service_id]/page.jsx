
import EmloyeesInAService from "@/components/EmloyeesInAService";
import ServicesPage from "@/components/ServicesPage";


const page = async ({ params }) => {
    const data = await params;

    const service_id = data.service_id
    return (
        <EmloyeesInAService service_id={service_id} />
    )
}

export default page
