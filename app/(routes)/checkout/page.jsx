"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const storedJwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [Subtotal, setSubtotal] = useState(0);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  

  useEffect(() => {
    if (storedUser && storedJwt) {
      getCartItems(storedUser.id, storedJwt);
    } else {
      router.push("/sign-in");
    }
  }, [storedUser, storedJwt]);

  const getCartItems = async (userId, jwt) => {
    try {
      const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);
      setTotalCartItem(cartItemList_?.length || 0);
      setCartItemList(cartItemList_ || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += parseFloat(element.amount) || 0;
    });

    const parsedTotal = parseFloat(total) || 0;
    setSubtotal(parsedTotal.toFixed(2));
  }, [cartItemList]);

  const taxTotalAmount = () => {
    const taxAmount = parseFloat(Subtotal) * 0.09 || 0;
    return taxAmount.toFixed(2);
  };

  const deliveryFee = 25;

  const calculateTotalAmount = () => {
    const subtotalAmount = parseFloat(Subtotal) || 0;
    const taxAmount = parseFloat(taxTotalAmount()) || 0;
    const totalAmount = subtotalAmount + taxAmount + deliveryFee;
    return totalAmount.toFixed(2);
  };

  const onApprove = (data) => {
    console.log(data);
    const payLoad = {
      data: {
        paymentId: data.paymentId.toString(),
        totalOrderAmount: calculateTotalAmount(),
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId:storedUser.id
      },
    };
    
    GlobalApi.createOrder(payLoad, storedJwt).then(resp => {
    console.log(resp);
    toast("Order Placed Successfully!")
    cartItemList.forEach(item , index =>{
      GlobalApi.deleteCartItem(item.id).then(resp => {
      })
    })
    router.replace('/order-confirmation')
    })
  };

  return (
    <div className="">
      <h2 className="p-3 bg-green-700 text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 min-[870px]:grid-cols-3 py-8 ">
        <div className="min-[870px]:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border my-10">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>{Subtotal}₹</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>{deliveryFee.toFixed(2)}₹</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>{taxTotalAmount()}₹</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>{calculateTotalAmount()}₹</span>
            </h2>
            {/* <Button onClick={()=>onApprove({paymentId:123})}> Payment <ArrowBigRight/></Button> */}
            <PayPalButtons
            disabled={!(username&&email&&zip&&address&&phone)}
              style={{ layout: "horizontal" }}
              onApprove={onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: calculateTotalAmount(), // Pass the correct total amount
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
