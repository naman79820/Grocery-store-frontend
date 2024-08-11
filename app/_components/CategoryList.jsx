import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CategoryList = ({categoryList}) => {
    
  return (
    <div className='ml-16'>
      <h2 className='font-bold text-green-700 text-2xl  '>
        Shop By Category
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5  w-[97%]'>
      {categoryList.map((category , index)=>(
      
      <Link href={'/products-category/'+category.attributes.Name} key={index} className='flex flex-col items-center mt-2 bg-green-100 gap-2 p-3 group rounded-lg cursor-pointer hover:bg-green-500' >
         
           <Image src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
        category?.attributes?.icon?.data?.[0]?.attributes?.url}  
          alt='icon'
          width={50}
          height={50}
          className='group- hover:scale-125 transition-all ease-in-out'
        
        />
        <h2 className='text-green-900 font-bold'>
            {category?.attributes?.Name}
        </h2>
        </Link>



      ))}
      </div>
    </div>
  )
}

export default CategoryList
