"use client"

import SearchInput from "./SearchInput"
import PageHeader from "./PageHeader"
import UserTopRight from "./UserTopRight"
import SwitchTheme from "./SwitchTheme"
import LangSwitcher from "./LangSwitcher"
import NotificationButton from "./NotificationButton"
import { Menu } from "lucide-react"
import { UseMainConext } from "@/contexts/MainContext"

const Header = () => {
    const { setSideBareVisible } = UseMainConext()
    return (
        <div className=" flex items-center gap-1  p-1 justify-between md:px-5 px-2 w-full  ">
            <button onClick={() => setSideBareVisible(true)} className="flex p-2 bg-background border border-foreground/20 rounded-md md:hidden">
                <Menu className="w-5 h-5" />
            </button>
            {/* <div className="flex  items-center"> */}
            <PageHeader />
            {/* </div> */}
            <SearchInput />
            <div className="flex gap-2 items-center">
                <SwitchTheme />
                <LangSwitcher />
            </div>
            <NotificationButton />
            <UserTopRight />
        </div>
    )
}

export default Header
