
const Loader1 = ({ className = " before:border-background", wh = " w-[20] h-[20]" }) => {
    return (
        <div className={`${className} loader before:border-2 ${wh}`}>
        </div>
    )
}

export default Loader1
