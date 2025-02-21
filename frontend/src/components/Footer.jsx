// import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#001F3F] py-10 px-20">

       <div className="container mx-auto flex justify-between items-center">
        <span className="text-[#EFE9D5] font-bold tracking-tight">
        Copyright ©{new Date().getFullYear()} All rights reserved
        </span>
        <span className="text-[#EFE9D5] font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Policy Privacy</p>
            <p className="cursor-pointer">Terms of Service</p>
        </span>
       </div>
    </div>
  )
}

export default Footer
