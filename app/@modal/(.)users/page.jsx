"use client"

import { useRouter } from "next/router"

const page = () => {
    const Router = useRouter()
    Router.push("/")
    return (
        <div></div>
    )
}

export default page
