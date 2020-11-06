import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateItem, updateItemWithInput } from "redux/cart/cart.actions";
import { Button, CardText, CardTitle, Row, Col } from "reactstrap";

const noImage = require("assets/img/no-image.jpg");

const CartRow = ({
  itemInfo,
  updateCart,
  index,
  updateItem,
  updateItemWithInput,
}) => {
  const [totalQuantity, setTotalQuantity] = useState("");

  useEffect(() => {
    setTotalQuantity(itemInfo.quantity);
  }, [itemInfo]);

  let item = "";
  let imageURL = "";
  let quantity = "";
  let units = "";
  let price = "";

  if (itemInfo) {
    item = itemInfo.item.Item;
    imageURL = itemInfo.item.Image;
    quantity = itemInfo.item.Quantity;
    units = itemInfo.item.Units;
    price = Number(itemInfo.item.Price).toFixed(2);
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
        <Button onClick={() => updateItem(itemInfo.item, "remove")}>
          Remove
        </Button>
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
              if (e.target.value.length < 1) {
                return setTotalQuantity("");
              }
              const value = Number(e.target.value);
              if (!value) return;
              updateItemWithInput(itemInfo.item, value);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                updateItemWithInput(itemInfo.item, 1);
              }
            }}
          />
          <div className="d-flex flex-column justify-content-center">
            <i
              className="nc-icon nc-simple-add rounded-circle my-1 btn btn-primary p-0"
              onClick={() => updateItem(itemInfo.item, 1)}
            />
            <i
              className="nc-icon nc-simple-delete rounded-circle my-1 btn btn-primary p-0"
              onClick={() => {
                updateItem(itemInfo.item, -1);
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

const mapDispatchToProps = (dispatch) => ({
  updateItem: (item, quantity) => dispatch(updateItem(item, quantity)),
  updateItemWithInput: (item, quantity) =>
    dispatch(updateItemWithInput(item, quantity)),
});

export default connect(null, mapDispatchToProps)(CartRow);
