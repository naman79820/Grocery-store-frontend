import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

const Slider = ({ SliderList }) => {
    // Log the sliderList to verify if it is passed correctly
  

    if (!SliderList) {
        return <p>No slides available</p>;
    }

    return (
        <div className='py-5 px-16'>
           
            <Carousel>
                <CarouselContent>
                    {SliderList.map((slider, index) => {
                        const imageUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            slider?.attributes?.image?.data?.[0]?.attributes?.url;

                        // Log each image URL for debugging
                     

                        return (
                            <CarouselItem key={index}>
                                <Image
                                    src={imageUrl}
                                    width={2000}
                                    height={300}
                                    alt='slider'
                                    className='w-screen h-[550px] max-[1400px]:h-[500px] max-[1280px]:h-[400px] max-[1100px]:h-[300px] max-[800px]:h-[270px] object-cover rounded-2xl max-[590px]:object-left-top'
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default Slider;
