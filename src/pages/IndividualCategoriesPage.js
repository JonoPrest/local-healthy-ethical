import React from "react";

import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import ProductCategory from "components/ProductCategory";

const IndividualCategoriesPage = ({ products, title }) => {
  return (
    <>
      <Button className="m-1" color="neutral" to="/shop" tag={Link}>
        <i className="nc-icon nc-minimal-left mr-1" /> Back to shop
      </Button>
      <div className="w-100 d-flex flex-column align-items-center">
        <h2 className="text-center p-4 text-secondary">
          <strong>{title}</strong>
        </h2>
        <div className="w-50 border border-secondary mb-5 mx-auto"></div>
        <div className="d-flex flex-wrap justify-content-center">
          <ProductCategory
            title={title}
            products={products}
          />
        </div>
        <div className="d-flex my-5">
          <Button className="m-1" color="neutral" to="/shop" tag={Link}>
            <i className="nc-icon nc-minimal-left mr-1" /> Back to shop
          </Button>
          <Button className="" to="/cart" tag={Link}>
            Go to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default IndividualCategoriesPage;
