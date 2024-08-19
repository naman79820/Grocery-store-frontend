"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState , useEffect } from 'react'
import { useRouter  } from 'next/navigation'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'

const SignIn = () => {

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if (jwt) {

      router.push('/')
    }

    
  }, [])
  
   
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const router = useRouter()
   const [loader, setloader] = useState()

   const onSignIn=()=>{
    setloader(false)
   GlobalApi.SignIn(email,password).then(resp=>{
    sessionStorage.setItem('user', JSON.stringify(resp.data.user))
    sessionStorage.setItem('jwt',resp.data.jwt)
    toast("Login Successfully")
    router.push('/')
    setloader(true)
   },(e)=>{
    
    toast(e?.response?.data?.error?.message)
   })

   }
 
  return (
    <div>
     <div className='flex my-20 items-baseline justify-center '>
     <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
      <Image src='/grocery logo.png' height={200} width={200} alt='logo'></Image>
      <h2 className=' font-bold text-3xl'>Sign In to Account</h2>
      <h2 className='text-gray-500'>Enter Your Email and Password to Sign In  </h2>
      <div className='w-full flex flex-col gap-5 mt-7 '>
       
        <Input onChange={(e)=>setemail(e.target.value)} placeholder='name@example.com'/>
        <Input onChange={(e)=>setpassword(e.target.value)}  type="password" placeholder='Password'/>
        <Button onClick={()=>onSignIn()} disabled={!(email||password)} > {loader?<LoaderIcon className='animate-spin'/>:"Sign In"}</Button>
        <p>Don't Have An Account? <Link className='text-blue-700' href={'/create-account'}>Create New Account</Link> </p>
      </div>
     </div>
    </div>
    </div>
  )
}

export default SignIn
