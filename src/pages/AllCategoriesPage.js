import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

// core components
import ProductCategory from "components/ProductCategory";

const AllCategoriesPage = ({ data, uniqueCategoryArray }) => {
  return (
    <div>
      <Button className="m-1" color="neutral" to="/shop" tag={Link}>
        <i className="nc-icon nc-minimal-left mr-1" /> Back to shop
      </Button>
      <div className="w-100 d-flex flex-column align-items-center">
        {uniqueCategoryArray.map((uniqueCategory, i) => {
          const products = data.filter((value) => {
            return value.Category === uniqueCategory.Item;
          });
          return (
            <div key={i}>
              <h2 className="text-center p-4 text-secondary">
                <strong>{uniqueCategory.Item}</strong>
              </h2>
              <div className="w-50 border border-secondary mb-5 mx-auto"></div>
              <div className="d-flex overflow-auto" style={{ width: "95vw" }}>
                <ProductCategory
                  key={i}
                  products={products}
                />
              </div>
            </div>
          );
        })}
        <div className="d-flex m-5">
          <Button className="m-1" color="neutral" to="/shop" tag={Link}>
            <i className="nc-icon nc-minimal-left mr-1" /> Back to shop
          </Button>
          <Button className="" to="/cart" tag={Link}>
            Go to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
