"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GlobalApi from '@/app/_utils/GlobalApi'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment'
import MyOrderItem from './_components/MyOrderItem'

const MyOrder = () => {
    const router = useRouter()
    const jwt = sessionStorage.getItem('jwt')
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        if (!jwt) {
            router.push('/sign-in')
        }
        getMyOrder()
    }, [])

    const getMyOrder = async () => {
        const orderList_ = await GlobalApi.getMyOrder(user.id, jwt)
     
        setOrderList(orderList_)
    }

    return (
        <div className=''>
            <h2 className="p-3 bg-green-700 text-xl font-bold text-center text-white">
                My Order
            </h2>
            <div className='py-8 mx-7 md:mx-20'>
                <h2 className='text-3xl font-bold text-green-700'>Order History</h2>
            </div>
            <div>
                {orderList.map((item, index) => (       
                    <Collapsible key={index}>
                        <CollapsibleTrigger>
                            <div className='border p-2 bg-slate-100 ml-20 flex justify-evenly gap-24 max-[830px]:gap-5 max-[830px]:text-center max-[830px]:ml-0'>
                                <h2><span className='font-bold mr-2'>Order Date: </span>{moment(item?.createdAt).format('MMMM Do YYYY')}</h2>
                                <h2><span className='font-bold mr-2'>Total Amount: </span> {item.totalOrderAmount}₹</h2>
                                <h2><span className='font-bold mr-2'>Status: </span> Pending</h2>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            {item.orderItemList.map((order, index_) => (
                                <MyOrderItem orderItem={order} key={index_} />
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    )
}

export default MyOrder
