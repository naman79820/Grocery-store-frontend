import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React , {useState , useEffect} from 'react'

const CartItemList = ({cartItemList , onDeleteItem}) => {

  

    
    
  return (
    <div>
      <div className='overflow-auto h-[700px]'>
        {cartItemList.map((cart , index) =>(
            <div className='flex items-center justify-between '> 
                <div className='flex gap-6 my-5 items-center'>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image} width={90} height={90} alt={cart.name}
                
                className='border p-2 '
                />
                <div>
                    <h2 className='font-bold'>{cart.name}</h2>
                    <h2>Quantity{cart.quantity}</h2>
                    <h2 className='text-lg font-bold'>{cart.amount}₹</h2>
                </div>
                </div>
                <TrashIcon className='cursor-pointer' onClick={()=>onDeleteItem(cart.id)}/>
                </div>
        ))}
      </div>
    
    </div>
  )
}

export default CartItemList
