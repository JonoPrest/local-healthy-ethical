import React from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const noImage = require("assets/img/no-image.jpg")

const ProductCategory = ({ title, products }) => {
  return (
    <>
    <h2>{title}</h2>
    <div className="d-flex overflow-auto" style={{ width: "800px" }}>
      
      {products.map((product) => {
        return (
          <Card className="mx-3" style={{ width: "15rem", minWidth: "15rem" }}>
            <CardImg
              top
              src={product.Image !== "" ? product.Image : noImage}
              alt="..."
            />
            <CardBody>
              <CardTitle>{product.Item}</CardTitle>
              <CardText>
                Supplier: {product.Supplier}
                <br/>
                Container: {product.Container}
                <br/>
                Quantity: {product.Quantity}{product.Unitss}
                <br/>
                Price: {product.Price}
                <br/>
              </CardText>
              <Button color="primary">Go somewhere</Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
    </>
  );
};

export default ProductCategory;
