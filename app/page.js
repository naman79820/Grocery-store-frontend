
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
export default async function Home() {

  const SliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  
  return (
   
    
    <div>
      <Slider SliderList={SliderList}/>
    <CategoryList categoryList={categoryList}/>
     
    </div>
  
    
  
  );
}
