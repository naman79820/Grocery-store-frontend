
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
export default async function Home() {

  const SliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList =  await GlobalApi.getAllProducts()
  
  return (
   
    
    <div>
      <Slider SliderList={SliderList}/>
    <CategoryList categoryList={categoryList}/>
    <ProductList productList={productList}/>
    {/*Banners*/}
    <Image
    src='/banner.png'
    width={1200}
    height={1000}
    alt="banner"
    className="w-full h-[400px] object-contain"

    />
     <Footer/>
    </div>
  
    
  
  );
}
