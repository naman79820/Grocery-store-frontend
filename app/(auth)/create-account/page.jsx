"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React ,{useState , useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'

const CreateAccount = () => {


  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if (jwt) {

      router.push('/')
    }

    
  }, [])
  
  const [username, setusername] = useState('')
  const [loader, setloader] = useState()

  const router = useRouter()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const onCreateAccount =()=>{
    setloader(true)
  GlobalApi.registerUser(username,email,password).then(resp=>{
    console.log(resp.data.user)
    console.log(resp.data.jwt)
    sessionStorage.setItem('user', JSON.stringify(resp.data.user))
    sessionStorage.setItem('jwt',resp.data.jwt)
    toast("Account Created Successfully.")
    router.push('/')
    setloader(false)
  
  }),(e)=>{
    setloader(false)
    toast(e?.response?.data?.error?.message)
  }
  }


  return (
    <div className='flex  my-20 items-baseline justify-center '>
     <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
      <Image src='/grocery logo.png' height={200} width={200} alt='logo'></Image>
      <h2 className=' font-bold text-3xl'>Create An Account</h2>
      <h2 className='text-gray-500'>Enter Your Email and Password to Create an Account </h2>
      <div className='w-full flex flex-col gap-5 mt-7 '>
        <Input onChange={(e)=>setusername(e.target.value)} placeholder='Username'/>
        <Input onChange={(e)=>setemail(e.target.value)} placeholder='name@example.com'/>
        <Input onChange={(e)=>setpassword(e.target.value)}  type="password" placeholder='Password'/>
        <Button onClick={()=>onCreateAccount()} disabled={!(username||email||password)} > {loader?<LoaderIcon className='animate-spin'/>:"Create an Account"}</Button>
        <p>Already Have an Account? <Link className='text-blue-700' href={'/sign-in'}>Click Here to Sign In</Link> </p>
      </div>
     </div>
    </div>
  )
}

export default CreateAccount
