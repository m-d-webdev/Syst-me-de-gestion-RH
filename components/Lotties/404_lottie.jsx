"use client";
import Lottie from "lottie-react"
import Animation from "./animations/404_error.json"
const NotFOund_lottie = () => {
    return (
        <Lottie 
        style={{ width: 250, height: 250 }}

            animationData={Animation} loop />
    )
}

export default NotFOund_lottie
