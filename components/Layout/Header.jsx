"use client"

import SearchInput from "./SearchInput"
import PageHeader from "./PageHeader"
import UserTopRight from "./UserTopRight"

const Header = () => {
    return (
        <div className=" flex items-center  p-1 justify-between px-5 w-full  ">

            {/* <div className="flex  items-center"> */}
            <PageHeader />
            {/* </div> */}
            <SearchInput />
            <UserTopRight />
        </div>
    )
}

export default Header
