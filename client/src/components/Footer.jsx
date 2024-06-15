import React from 'react'
import {Typography} from "@material-tailwind/react"

function Footer() {
  return (
    <div className='border-2 py-4 text-sm md:text-base md:py-6'>
        <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 Gaurang Saini - Cloudify Notes
      </Typography>
    </div>
  )
}

export default Footer