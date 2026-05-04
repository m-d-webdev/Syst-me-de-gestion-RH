"use client";
import Lottie from "lottie-react"
import Animation from "./animations/no_result_found.json"
const NoResult = () => {
    return (
        <Lottie
            style={{ width: 150, height: 150 }}
            animationData={Animation} loop />
    )
}

export default NoResult
