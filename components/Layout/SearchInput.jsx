"use client"


const SearchInput = () => {
    return (
        <div className="flex bg-background md:w-[400] w-[250] p-2 px-3 items-center gap-3 border border-foreground/10 rounded-full">
            <i className="bi text-sm opacity-80 bi-search"></i>
            <input type="text" className="text-sm outline-none  w-full bg-transparent tracking-tight" placeholder="Rechercher dans le système..." />
        </div>
    )
}

export default SearchInput
