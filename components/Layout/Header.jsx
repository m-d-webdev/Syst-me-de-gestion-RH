"use client"

import SearchInput from "./SearchInput"
import PageHeader from "./PageHeader"
import UserTopRight from "./UserTopRight"
import SwitchTheme from "./SwitchTheme"
import LangSwitcher from "./LangSwitcher"

const Header = () => {
    return (
        <div className=" flex items-center  p-1 justify-between px-5 w-full  ">

            {/* <div className="flex  items-center"> */}
            <PageHeader />
            {/* </div> */}
            <SearchInput />
            <div className="flex gap-2 items-center">
                <SwitchTheme />
                <LangSwitcher />
            </div>
            <UserTopRight />
        </div>
    )
}

export default Header
