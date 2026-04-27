import * as React from "react"

function Input({
  label,
  id = "input",
  className,
  parentclassName = "",
  type,
  placeholder = " ",
  icon,
  info,
  labelClassName,
  ...props
}) {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        {
          label &&
          <label className="text-sm ml-1  font-medium  mb-1">{label}</label>
        }
        {
          info && info
        }
      </div>
      <div className={`${parentclassName} border border-foreground/10 rounded-md flex items-center gap-2  px-2 py-[7]`}>
        {
          icon && icon
        }
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          data-slot="input"
          className={`${className} w-full  border-none outline-none text-sm tracking-tight   focus:outline-none `}


          {...props} />
      </div>

    </div>

  );
}

export { Input }
