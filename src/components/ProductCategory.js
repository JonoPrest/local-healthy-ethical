import React from "react";

import ProductCard from "components/ProductCard";

const ProductCategory = ({ products, addToCart }) => {
  return (
    <>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} addToCart={addToCart} />;
      })}
    </>
  );
};

export default ProductCategory;
