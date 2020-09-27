import React from "react";

import { Button, CardText, CardTitle, Row, Col } from "reactstrap";

const noImage = require("assets/img/no-image.jpg");

const CartRow = ({ itemInfo, updateCart, index }) => {
  let item = "";
  let imageURL = "";
  let quantity = "";
  let units = "";
  let price = "";
  let totalQuantity = "";
  if (itemInfo) {
    item = itemInfo.product.Item;
    imageURL = itemInfo.product.Image;
    quantity = itemInfo.product.Quantity;
    units = itemInfo.product.Units;
    price = Number(itemInfo.product.Price).toFixed(2);

    totalQuantity = itemInfo.quantity;
  }

  return (
    <Row className="d-flex align-items-center border-top border-bottom my-3 py-3">
      <Col>
        <img
          style={{ width: "100%", height: "100px", objectFit: "contain" }}
          src={imageURL ? imageURL : noImage}
          alt=""
        />
      </Col>
      <Col>
        <CardTitle>{item}</CardTitle>
        <CardText>
          <strong>Quantity:</strong> {quantity + units}
          <br />
        </CardText>
        <Button onClick={() => updateCart(index, "remove")}>Remove</Button>
      </Col>
      <Col>
        <strong>R{price}</strong>
      </Col>
      <Col>
        <div className="d-flex ">
          <input
            type="text"
            value={totalQuantity}
            style={{ width: "30px" }}
            className="m-3"
            onChange={(e) => {
              if (!Number(e.target.value) && e.target.value !== "") return;
              const value = Number(e.target.value);
              updateCart(index, "change", value);
            }}
          />
          <div className="d-flex flex-column justify-content-center">
            <i
              className="nc-icon nc-simple-add rounded-circle my-1 btn btn-primary p-0"
               onClick={() => updateCart(index,"change" ,totalQuantity + 1)}
            />
            <i
              className="nc-icon nc-simple-delete rounded-circle my-1 btn btn-primary p-0"
                onClick={() => {
                  if (totalQuantity > 1) {
                    updateCart(index,"change" , totalQuantity - 1);
                  }
                }}
            />
          </div>
        </div>
      </Col>
      <Col>
        <strong>R{(totalQuantity * price).toFixed(2)}</strong>
      </Col>
    </Row>
  );
};

export default CartRow;
