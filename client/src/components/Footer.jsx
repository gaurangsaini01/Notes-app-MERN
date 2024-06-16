import React from 'react'
import {Typography} from "@material-tailwind/react"

function Footer() {
  return (
    <div className='border-2 w-full py-4  md:py-6'>
        <Typography color="blue-gray" className="text-center text-[10px] md:text-sm font-normal">
        &copy; 2024 Gaurang Saini - Cloudify Notes
      </Typography>
    </div>
  )
}

export default Footer