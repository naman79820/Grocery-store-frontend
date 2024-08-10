import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'


const ProductItem = ({product}) => {
  return (
    <div className='w-[88%] font-bold '>
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg mt-5 mb-5 hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer' >
      <Image
      src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+ product?.attributes?.images?.data[0]?.attributes?.url}

      width={200}
      height={300}
      alt={product.attributes.Name}
      className='h-[200px] w-[200px] object-contain'
      />
      <h2 className='text-lg'>{product.attributes.Name}</h2>
      <div className='flex items-center gap-2'> 
      {product.attributes.sellingPrice&&
      
      <h2 className='font-bold text-lg'>
        {product.attributes.sellingPrice} ₹
        </h2>}
      <h2 className={`flex items-center  ${product.attributes.sellingPrice && 'line-through text-gray-500'} `}>{product.attributes.mrp} ₹</h2>
      </div>
     
      <Dialog>
  <DialogTrigger asChild>
     <Button className="text-green-500 hover:text-white hover:bg-green-500" variant="outline">Add to cart</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
    
      <DialogDescription>
       <ProductItemDetail product={product}/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

   
    </div>
    </div>
  )
}

export default ProductItem
