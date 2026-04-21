import { CompanyName } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className, textClass }) => {
  return (
    <Link href={"/"} className='flex   items-center'>
      <div className="flex items-center p-1 justify-center bg-background border border-foreground/10 rounded-md ">
        <img src="/logo.png" className='h-30' alt="" />
        {/* <h1 className='font-bold text-base'>{CompanyName}</h1> */}
      </div>
      {/* <i className="bi bi-emoji-sunglasses text-chart-1"></i> */}
    </Link>
  )
}

export default Logo
