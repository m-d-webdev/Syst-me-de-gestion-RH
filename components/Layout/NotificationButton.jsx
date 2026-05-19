"use client"


export default function NotificationButton() {

    return (
        <div className="relative">
            <button className="p-1 px-2 border cursor-pointer relative border-foreground/10 bg-background rounded-md">
                <i className="bi bi-bell"></i>
                <span className="absolute bg-red-500 w-2 h-2 rounded-full top-[4px] right-[4]"></span>
            </button>

        </div>
    );
}