import UpdateDataComponent from "./RegisterComponent"


const page = async ({ params }) => {
    const { id } = await params
    return (
        <UpdateDataComponent id={id} />
    )
}

export default page
