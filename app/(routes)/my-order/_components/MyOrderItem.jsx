import Image from 'next/image'
import React from 'react'

const MyOrderItem = ({orderItem}) => {
  return (
    <div className='w-[60%] my-5 '>
    <div className='grid grid-cols-5  items-center max-[830px]:flex max-[830px]:flex-col max-[830px]:items-center max-[830px]:text-center max-[830px]:justify-center'>
      
      
      <Image className='ml-20 max-[830px]:ml-0 bg-gray-100 p-5 rounded-md border' src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+orderItem.product.data.attributes.images.data[0].attributes.url} width={80} height={80} alt="image" />
      <div className='col-span-2'>
        <h2 className='ml-20 max-[830px]:ml-0 '>{orderItem.product.data.attributes.Name}

        </h2>
        <h2 className='ml-20 max-[830px]:ml-0 '>Item Price:{orderItem.product.data.attributes.mrp}₹

        </h2>
      </div>
      <h2 className=''>Quantity:{orderItem.quantity}</h2>
      <h2>Price:{orderItem.amount}₹</h2>
    </div>
    <hr />
    </div>
  )
}

export default MyOrderItem
