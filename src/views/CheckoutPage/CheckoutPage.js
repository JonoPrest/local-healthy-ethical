import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserOrder } from "components/firebaseUtilities";

import "./CheckoutPage.css";

// core components
import CartHeader from "components/Headers/CartHeader";

const CheckoutPage = ({ cart, total, currentUser, setCart, setCartCount }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async () => {
    await createUserOrder(currentUser, cart);
    setCart([]);
    setCartCount(0);
    setOrderPlaced(true);
  };

  return (
    <>
      <CartHeader />

      {cart.length === 0 ? (
        <div
          style={{ height: `calc(60vh - 85px)`, width: "100%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="p-3 text-center">
            {orderPlaced
              ? "Thank you for your Order"
              : "There are no items in your cart"}
          </h2>
          <Button to="/shop" tag={Link} onClick={()=>setOrderPlaced(false)}>
            Go to Shop
          </Button>
        </div>
      ) : (
        <div style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}>
          <div className="title">
            <h1>Your Order:</h1>
            <p>
              Once you place your order, you will receive an email confirming we
              have received it. The following is an estimated total and the
              final amount may vary slightly when the items arrive. The reason
              is because Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Veritatis tempora dicta assumenda nam quis id eius,
              consectetur maxime obcaecati corrupti odio a, temporibus labore,
              sint vel asperiores recusandae unde delectus.
            </p>
          </div>
          <div className="invoice-box">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr className="heading">
                  <td>Quantity</td>
                  <td>Item</td>

                  <td>Price</td>
                </tr>

                {cart.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.quantity}</td>
                      <td>
                        {item.product.Item +
                          " (" +
                          item.product.Quantity +
                          item.product.Units +
                          ")"}
                      </td>
                      <td>{`R${item.product.Price}`}</td>
                    </tr>
                  );
                })}

                <tr className="total">
                  <td></td>
                  <td></td>

                  <td>{`Total: R${total}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-100 d-flex justify-content-center my-5">
            <Button onClick={handleOrder}>Place Order</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
