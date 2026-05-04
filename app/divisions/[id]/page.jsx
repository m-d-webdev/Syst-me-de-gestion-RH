
import ServicesPage from "@/components/ServicesPage";


const page = async ({ params }) => {
    const data = await params;
    const id = data.id

    return (
        <ServicesPage division_id={id} />
    )
}

export default page
