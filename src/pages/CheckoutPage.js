import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserOrder } from "firebaseUtilities";

import { clearCart } from "redux/cart/cart.actions";

import "./CheckoutPage.css";

// core components
import Header from "components/Headers/Header";

const CheckoutPage = ({ cart, total, currentUser, clearCart }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async () => {
    createUserOrder(currentUser, cart).then(() => {
      clearCart();
      setOrderPlaced(true);
    });
  };

  return (
    <>
      <Header title="Checkout" imgName="cart-cover.jpeg" />

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
          <Button to="/shop" tag={Link} onClick={() => setOrderPlaced(false)}>
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
                        {item.item.Item +
                          " (" +
                          item.item.Quantity +
                          item.item.Units +
                          ")"}
                      </td>
                      <td>{`R${item.item.Price}`}</td>
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

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
