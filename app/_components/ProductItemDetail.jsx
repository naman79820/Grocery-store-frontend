"use client";
import React , {useContext, useState} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner"
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {
  const [productTotalPrice, setproductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );

  const [Quantity, setQuantity] = useState(1)
  const [Loading, setLoading] = useState(false)
  const jwt = sessionStorage.getItem('jwt')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const router = useRouter()
  const {updateCart, setUpdateCart}=useContext(UpdateCartContext)

  const addToCart = () =>{
    setLoading(true)
   if(!jwt){
   
    router.push('/sign-in')
    setLoading(false)
    return;
   }

  const data={
 data:{
  quantity:Quantity,
  amount:(Quantity*productTotalPrice).toFixed(2),
  products:product.id,
  users_permissions_users:user.id,
  userId:user.id
 }

  }

  toast('Added to Cart')
  setUpdateCart(!updateCart)
  setLoading(false)

  GlobalApi.addToCart(data,jwt).then(resp=>{
   
  },(e)=>{
    toast('Error while adding into cart')
    setLoading(false)
  })
  }
  

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 p-7 text-black bg-white max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            product?.attributes?.images?.data[0]?.attributes?.url
          }
          width={200}
          height={300}
          alt={product.attributes.Name}
          className="bg-slate-100 p-5 h-[320px] w-[300px] object-contain rounded-lg"
        />

        <div className="flex flex-col gap-3 max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center">
          <h2 className="text-2xl font-bold ml-28  max-[768px]:ml-0">
            {product.attributes.Name}
          </h2>
          <h2 className="text-sm font-bold text-gray-400 ml-5 ">
            {product.attributes.description}
          </h2>

          <div className="flex  font-bold gap-2 ml-5 text-3xl  ">
            {product.attributes.sellingPrice && (
              <h2 className="font-bold text-3xl">
                {product.attributes.sellingPrice} ₹
              </h2>
            )}
            <h2
              className={`flex items-center  ${
                product.attributes.sellingPrice &&
                "line-through text-gray-500 text-3xl"
              } `}
            >
              {product.attributes.mrp} ₹
            </h2>
          </div>
          <h2 className="ml-5  text-lg font-medium">
            {product.attributes.itemQuantityType}
          </h2>
          <div className="flex flex-col items-baseline ml-5 font-bold">
            <div className="flex items-center gap-2 ">
            <div className="p-2 border flex gap-10 items-center px-5 max-[360px]:gap-5">
              <button className="cursor-pointer :" disabled={Quantity==1} onClick={()=>setQuantity(Quantity-1)}>-</button>
              <h2 className="text-base  ">{Quantity}</h2>
              <button className="cursor-pointer"  onClick={()=>setQuantity(Quantity+1)}>+</button>
            </div>
            <h2 className="text-xl max-[320px]:text-base ">= {(Quantity*productTotalPrice).toFixed(2)}₹</h2>
            </div>
            <div className="max-[768px]:mx-auto  max-[768px]:w-full max-[768px]:items-center max-[768px]:ml-10 max-[360px]:ml-7">
            <Button onClick={()=>addToCart() } className="flex gap-3 mt-5  "
              disabled={Loading}
              >
              <ShoppingBasket />
              {Loading?<LoaderCircle className="animate-spin"/>:"Add To Cart"}
              
            </Button>
            </div>
          </div>
          <h2 className="ml-5 font-bold">
            <span>Category:</span>{" "}
            {product?.attributes?.categories?.data[0]?.attributes?.Name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductItemDetail;
