import React, { useState } from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const noImage = require("assets/img/no-image.jpg");

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [btnText, setBtnText] = useState("Add to Cart");
  const [btnColor, setBtnColor] = useState("primary");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const addToCartClicked = (e) => {
    e.preventDefault();
    addToCart({product: product, quantity: quantity});
    setBtnText("Added");
    setBtnColor("success");
    setBtnDisabled(true);
    setTimeout(() => {
      setBtnText("Add to Cart");
      setBtnColor("primary");
      setBtnDisabled(false);
      setQuantity(1);
    }, 1500);
  };

  return (
    <Card className="mx-3 card-product" style={{ width: "20rem", minWidth: "20rem" }}>
      <CardImg
        top
        src={product.Image !== "" ? product.Image : noImage}
        alt="..."
        style={{ height: "14rem", objectFit: "cover"}}
      />
      <CardBody>
        <CardTitle>{product.Item}</CardTitle>
        <CardText>
          <strong>Supplier:</strong> {product.Supplier}
          <br />
          <strong>Container:</strong> {product.Container}
          <br />
          <strong>Quantity:</strong> {product.Quantity}
          {product.Units}
          <br />
          <strong>Price:</strong> {product.Price}
          <br />
        </CardText>
        <form className="d-flex justify-content-around" onSubmit={addToCartClicked}>
          <Button color={btnColor} type="submit" disabled={btnDisabled}>
            {btnText}
            {btnText === "Added" && <i className="nc-icon nc-check-2 ml-4" style={{fontSize: "15px"}}/>}
          </Button>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              value={quantity}
              style={{ width: "30px" }}
              className="m-3"
              onChange={(e) => {
                    if(!Number(e.target.value) && e.target.value !== "") return;
                  setQuantity(Number(e.target.value));
                
              }}
            />
            <div className="d-flex flex-column justify-content-center">
              <i
                className="nc-icon nc-simple-add rounded-circle my-1 btn btn-primary p-0"
                onClick={() => setQuantity(quantity + 1)}
              />
              <i
                className="nc-icon nc-simple-delete rounded-circle my-1 btn btn-primary p-0"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              />
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
