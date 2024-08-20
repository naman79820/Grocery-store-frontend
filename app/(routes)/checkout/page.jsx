"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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

  // Using refs to ensure stable access to state values in the onApprove function
  const usernameRef = useRef(username);
  const emailRef = useRef(email);
  const phoneRef = useRef(phone);
  const zipRef = useRef(zip);
  const addressRef = useRef(address);

  useEffect(() => {
    usernameRef.current = username;
    emailRef.current = email;
    phoneRef.current = phone;
    zipRef.current = zip;
    addressRef.current = address;
  }, [username, email, phone, zip, address]);

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
      setCartItemList(cartItemList_);
      console.log("Cart Item List:", cartItemList_);
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

  const deliveryFee = 5;

  const calculateTotalAmount = () => {
    const subtotalAmount = parseFloat(Subtotal) || 0;
    const taxAmount = parseFloat(taxTotalAmount()) || 0;
    const totalAmount = subtotalAmount + taxAmount + deliveryFee;
    return totalAmount.toFixed(2);
  };

  const onApprove = async (data) => {
    const payLoad = {
      data: {
        paymentId: data.paymentID.toString(),
        totalOrderAmount: calculateTotalAmount(),
        username: usernameRef.current,
        email: emailRef.current,
        phone: phoneRef.current,
        zip: zipRef.current,
        address: addressRef.current,
        orderItemList: cartItemList,
        userId: storedUser.id,
      },
    };

    console.log("Payload before sending to backend:", payLoad);

    try {
      // Step 1: Create the order
      const orderResponse = await GlobalApi.createOrder(payLoad, storedJwt);
      console.log("Order Response:", orderResponse);

      // Step 2: Delete all cart items
      const deletePromises = cartItemList.map((item) =>
        GlobalApi.deleteCartItem(item.id, storedJwt)
      );
      await Promise.all(deletePromises);

      // Step 3: Notify success and redirect
      toast("Order Placed Successfully!");
      router.replace("/order-confirmation");
    } catch (error) {
      console.error("Error during order processing:", error);
      toast("Order processing failed, please try again.");
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              value={address}
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
            <PayPalButtons
              disabled={
                !(username && email && zip && address && phone)
              }
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
