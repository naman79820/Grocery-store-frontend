import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productList}) => {
  return (
    <div className='ml-16 '>
        <h2 className='font-bold text-green-700 text-2xl mt-10 '>
        Our Popular Products
      </h2>
      <div className='grid grid-cols-2 max-[350px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {productList.map((product , index)=>index<8&&(
         <ProductItem product={product}
          key={index}
         />
      ))}
      </div>
    </div>
  )
}

export default ProductList
