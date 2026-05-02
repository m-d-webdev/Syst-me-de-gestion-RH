"use client";
import Lottie from "lottie-react"
import Animation from "./animations/Welcome.json"
const WelcomeLottie = () => {
    return (
        <Lottie
            style={{ width: 200, height: 200 }}

            animationData={Animation} loop />
    )
}

export default WelcomeLottie
