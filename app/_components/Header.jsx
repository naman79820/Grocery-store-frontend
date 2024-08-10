"use client"
import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import {React , useEffect , useState} from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'


const Header = () => {

  const [categoryList, setcategoryList] = useState([])

useEffect(() => {
  getCategorylist()


}, [])


  
  const getCategorylist=() =>{
  GlobalApi.getCategory().then(resp=>{
   
   setcategoryList(resp.data.data)
   
  })
  }
  return (
  <div className=' flex w-[100%] h-20 shadow-md justify-between'>
   <nav className='    flex items-center gap-10 max-[520px]:gap-2'>
   <div>
    <Image src="/grocery logo.png" height={200} width={150} alt="icon" className='w-[150px] object-contain max-[400px]:w-[100px] max-[350px]:w-[70px]'  />
   </div>
  
    
    <DropdownMenu >
  <DropdownMenuTrigger> <h2 className='flex gap-2 font-bold p-3 px-6 max-[460px]:px-3 max-[460px]:text-sm bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400'>
      <LayoutGrid/> Category
    </h2></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {categoryList.map((category , index)=>(
       <DropdownMenuItem key={index} className="flex items-center gap-2 cursor-pointer">
        <Image src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
        category?.attributes?.icon?.data?.[0]?.attributes?.url}  
          alt='icon'
          width={30}
          height={30}
        
        />
        <h2 className='text-base font-bold'>{category?.attributes?.Name}</h2></DropdownMenuItem>
    ))}
   
   
  </DropdownMenuContent>
</DropdownMenu>

    <div className='hidden min-[820px]:flex p-2 gap-3 rounded-full border border-gray-300'>
      <Search/>
      
      <input type="text" name="" id="" placeholder='Search' className='outline-none ' />
    </div>
    </nav>
     
     <div className='flex items-center gap-5 mr-5 max-[420px]:gap-2  max-[420px]:mr-1 '>
     <h2 className='flex gap-2'> <ShoppingBag/> 0 </h2>
     <Button>Login</Button>
     </div>
   

   
   </div>
  )
}

export default Header
