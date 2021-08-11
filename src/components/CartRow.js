import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateItem, updateItemWithInput } from "redux/cart/cart.actions";
import { Button, CardText, CardTitle, Row, Col } from "reactstrap";

const CartRow = ({ itemInfo, updateItem, updateItemWithInput }) => {
  const [totalQuantity, setTotalQuantity] = useState("");

  useEffect(() => {
    setTotalQuantity(itemInfo.quantity);
  }, [itemInfo]);

  let item = "";
  let quantity = "";
  let units = "";
  let price = "";
  let totalPrice = "";

  if (itemInfo) {
    item = itemInfo.item.Item;
    quantity = itemInfo.item.Quantity;
    units = itemInfo.item.Units;
    price = Number(itemInfo.item.Price).toFixed(2);
    totalPrice = itemInfo.total;
  }

  return (
    <Row className="d-flex align-items-center border-top border-bottom my-3 py-3">
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
        <strong>R{totalPrice}</strong>
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
