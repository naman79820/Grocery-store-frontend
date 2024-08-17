import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div>
     <footer className="shadow-inner mt-10 ">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-center text-teal-600 sm:justify-start">
     <Image src="/grocery logo.png"
     width={300}
     height={500}
     alt='logo'
     className='w-[250px] object-contain max-[640px]:w-[200px] max-[350px]:w-[70px]'/>
     
      </div>

      <p className="mt-4 text-center text-lg font-bold text-gray-500 lg:mt-0 lg:text-right">
        Copyright &copy; 2024. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
