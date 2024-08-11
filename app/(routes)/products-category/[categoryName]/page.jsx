import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '../../TopCategoryList';
import ProductList from '@/app/_components/ProductList';

const productsCategory = async ({ params }) => {
  const categoryList = await GlobalApi.getCategoryList();
  
  // Decode the category name from the URL
  const decodedCategoryName = decodeURIComponent(params.categoryName);
  const productList = await GlobalApi.getProductsByCategory(params.categoryName);
  console.log('Decoded Category Name:', decodedCategoryName);

  return (
    <div>
      <h2 className="p-4 bg-green-700 text-white font-bold text-3xl text-center">
        {decodedCategoryName}
      </h2>
      <TopCategoryList 
        categoryList={categoryList}
        selectedCategory={params.categoryName} 
      />
      <div>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default productsCategory;
