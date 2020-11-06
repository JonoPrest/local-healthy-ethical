import React from "react";

import ProductCard from "components/ProductCard";

const ProductCategory = ({ products }) => {
  return (
    <>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} />;
      })}
    </>
  );
};

export default ProductCategory;
