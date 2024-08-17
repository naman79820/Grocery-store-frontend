import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductList from "../_components/ProductList";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div>
      <div className="ml-16">
        <h2 className="font-bold text-green-700 text-2xl">
          Shop By Category
        </h2>
        <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
          {categoryList.map((category, index) => {
            const encodedCategoryName = encodeURIComponent(category.attributes.Name);
            const isSelected = decodeURIComponent(selectedCategory) === category.attributes.Name;

            return (
              <Link
                href={"/products-category/" + encodedCategoryName}
                key={index}
                className={`flex ${isSelected && 'bg-green-600'} flex-col w-[150px] min-w-[100px] items-center mt-2 bg-green-100 gap-2 p-3 group rounded-lg cursor-pointer hover:bg-green-500`}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    category?.attributes?.icon?.data?.[0]?.attributes?.url
                  }
                  alt="icon"
                  width={50}
                  height={50}
                  className="group-hover:scale-125 transition-all ease-in-out"
                />
                <h2 className={`text-green-900 font-bold ${isSelected && 'text-white'}`}>
                  {category?.attributes?.Name}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopCategoryList;
