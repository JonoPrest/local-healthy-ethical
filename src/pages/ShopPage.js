import React from "react";
import { Spinner } from "reactstrap";
import { Link, Route, Redirect, Switch } from "react-router-dom";

import "./ShopPage.css";

// core components
import Header from "components/Headers/Header";
import CategoryCard from "components/CategoryCard";
import ProductsAll from "components/ProductsAll";
import Products from "components/Products";

const allCatImg = require("assets/img/splash-image.jpg");

const ShopPage = ({ data, dataLoaded }) => {
  const uniqueCategoryArray = data.filter((value, index, self) => {
    return (
      self.findIndex((v) => v.Category === value.Category) === index &&
      value.Category !== "" &&
      value.Category !== "Title"
    );
  });

  return (
    <div>
      <Header imgName="shop-cover.jpg" />
      {!dataLoaded ? (
        <div
          style={{ height: `calc(60vh - 85px)`, width: "100%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="p-3 text-center">Shop Items Loading</h2>
          <Spinner />
        </div>
      ) : (
        <div className="shopContainer">
          <Switch>
            <Route
              exact
              path="/shop"
              render={(props) => {
                return (
                  <div className="d-flex flex-wrap justify-content-center">
                    <Link to="/shop/all">
                      <CategoryCard
                        {...props}
                        title="All Categories"
                        imgUrl={allCatImg}
                      />
                    </Link>
                    {uniqueCategoryArray.map((category, i) => {
                      return (
                        <Link key={i} to={`/shop/${category.Category}`}>
                          <CategoryCard
                            {...props}
                            title={category.Category}
                            imgUrl={category.Image}
                          />
                        </Link>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Route
              path="/shop/all"
              render={(props) => (
                <ProductsAll
                  {...props}
                  data={data}
                  uniqueCategoryArray={uniqueCategoryArray}
                />
              )}
            />

            {uniqueCategoryArray.map((category, i) => {
              const products = data.filter((value) => {
                return value.Category === category.Category;
              });
              return (
                <Route
                  key={i}
                  path={`/shop/${category.Category}`}
                  render={(props) => (
                    <Products
                      {...props}
                      products={products}
                      title={category.Category}
                    />
                  )}
                />
              );
            })}

            <Redirect to="/shop" />
          </Switch>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
