
const Loader1 = ({ className = " before:border-foreground", wh = " w-[25] h-[25]" }) => {
    return (
        <div className={`${className} loader before:border-2 ${wh}`}>
        </div>
    )
}

export default Loader1
