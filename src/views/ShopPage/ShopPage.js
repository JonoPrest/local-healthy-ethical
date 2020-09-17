import React, { useEffect, useState } from "react";
import Papa from "papaparse";

import "./ShopPage.css";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ProductCategory from "components/ProductCategory";
import ShopHeader from "components/Headers/ShopHeader";

import { database } from "components/database";

const ShopPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const proxyUrl = "https://agile-anchorage-79298.herokuapp.com/";
    const apiURL =
      "https://docs.google.com/spreadsheets/d/1T2EV-ArYBTgchH1h89pqK0ffc77EDTffItpNqoHosd0/export?format=csv";

    //Get google sheet data using papa parse

    Papa.parse(proxyUrl + apiURL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      comments: "#",
      complete: function (results) {
        setData(results.data);
      },
    });
  }, []);

  const uniqueCategoryArray = data.filter((value, index, self) => {
    return (
      self.findIndex((v) => v.Category === value.Category) === index &&
      value.Category !== "" &&
      value.Category !== "Title"
    );
  });

  return (
    <div>
      <ExamplesNavbar />
      <ShopHeader />

      <div className="w-100 d-flex flex-column  align-items-center belowNav">
        {uniqueCategoryArray.map((uniqueCategory) => {
          const products = data.filter((value) => {
            return value.Category === uniqueCategory.Category;
          });
          console.log("Products", products)
          return <ProductCategory title={uniqueCategory.Category} products={products}/>;
        })}
        {/* <ProductCategory category={database.berries} data={data}/>
        <ProductCategory category={database.eggs} />
        <ProductCategory category={database.coffee} />
        <ProductCategory category={database.dairy} /> */}
      </div>

      <DemoFooter />
    </div>
  );
};

export default ShopPage;
