"use client"

const TableCardItem = ({
    title = "",
    entries = [],
    buttons = []
}) => {
    return (
        <div className="w-full  border bg-sidebar border-foreground/15 rounded-2xl ">
            <div className="flex border-b bg-background rounded-t-2xl border-foreground/10 gap-2 p-2 py-3">
                <>{title}</>
            </div>
            <div className="p-3 w-full mt-2 bg-sidebar rounded-b-2xl">

                <div className="flex w-full  flex-col gap-1">
                    {
                        entries.map(e => e)
                    }
                </div>

                <div className="w-full mt-2 flex gap-2">
                    {buttons?.map(b => b)}
                </div>

            </div>
        </div>
    )
}

export default TableCardItem