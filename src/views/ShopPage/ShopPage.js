import React from "react";

import "./ShopPage.css";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NucleoIcons from "views/NucleoIcons.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProductCategory from "components/ProductCategory";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";

const ShopPage = () => {
  return (
    <div
      style={{
        background: "black",
      }}
    >
      <ExamplesNavbar />
      <ProfilePageHeader />

      <div className="w-100 d-flex flex-column  align-items-center belowNav">
        <ProductCategory />
        <ProductCategory />
        <ProductCategory />
        <ProductCategory />
      </div>

      <DemoFooter />
    </div>
  );
};

export default ShopPage;
