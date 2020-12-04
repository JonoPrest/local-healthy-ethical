import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, InputGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserOrder } from "firebaseUtilities";

import { clearCart } from "redux/cart/cart.actions";

import "./CheckoutPage.css";

// core components
import Header from "components/Headers/Header";
import BackButton from "components/BackButton";
import { addHtmlAndStylingToOrder } from "utils/hml-and-styling-for-nodemailer";
import { sendOrderConfirmation } from "mailUtils";
import { setCurrentUser } from "redux/user/user.actions";

const CheckoutPage = ({
  cart,
  total,
  currentUser,
  clearCart,
  orderGroupName,
  marketDayFee,
}) => {
  const [screenMessage, setScreenMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState("waiting");

  useEffect(() => {
    if (orderStatus === "waiting") {
      setScreenMessage("");
    }
    if (cart.length === 0) {
      setScreenMessage("There are no items in your cart");
    }
    if (orderStatus === "complete") {
      setScreenMessage("Thank you, your order has been placed");
    }
    if (orderStatus === "not-sent") {
      setScreenMessage(
        "Your order was received! Unfortunately there was a problem with our mail server and we weren't able to send you your own copy."
      );
    }
    if (orderStatus === "error") {
      setScreenMessage(
        "There was an error placing your order please try again."
      );
    }
  }, [cart, orderStatus]);

  const componentRef = useRef();

  const handleSendEmail = () => {
    const emailContent = addHtmlAndStylingToOrder(
      componentRef.current.innerHTML
    );
    return sendOrderConfirmation(currentUser, emailContent)
      .then(() => {
        setOrderStatus("sent");
        return "sent";
      })
      .catch(() => {
        setOrderStatus("not-sent");
        return "not-sent";
      });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (currentUser && currentUser.userAccepted) {
      setOrderStatus("placing");
      createUserOrder(currentUser, cart, orderGroupName)
        .then(() => {
          setOrderStatus("placed");
          handleSendEmail();
        })
        .then(() => {
          clearCart();
          if (orderStatus === "sent") {
            setOrderStatus("complete");
          }
        })
        .catch((err) => setOrderStatus("error"));
    } else {
      console.log(currentUser);
      setScreenMessage("Please sign in before proceeding.");
    }
  };

  return (
    <>
      <Header title="Checkout" imgName="cart-cover.jpeg" />
      <BackButton />
      {screenMessage ? (
        <div
          style={{ height: `calc(60vh - 85px)`, width: "100%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 style={{  maxWidth: "800px" }} className="p-3 text-center">{screenMessage}</h2>
          {orderStatus === "error" ? (
            <Button
              to="/cart/checkout"
              tag={Link}
              onClick={() => setOrderStatus("waiting")}
            >
              Go to checkout
            </Button>
          ) : (
            <Button
              to="/shop"
              tag={Link}
              onClick={() => setOrderStatus("waiting")}
            >
              Go to Shop
            </Button>
          )}
        </div>
      ) : (
        <Form onSubmit={handleOrder}>
          <div
            style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
            className="checkout-container"
          >
            <div className="title">
              <h1>Your Order:</h1>
            </div>
            <div className="invoice-box" ref={componentRef}>
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

                  <tr>
                    <td>1</td>
                    <td>Market Day Fee</td>
                    <td>{`R${marketDayFee}`}</td>
                  </tr>

                  <tr className="total">
                    <td></td>
                    <td></td>

                    <td>{`Total: R${(
                      Number(total) + Number(marketDayFee)
                    ).toFixed(2)}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="title">
              Once you place your order, you will receive an email confirming we
              have received it. The following is an estimated total and the
              final amount may vary slightly when the items arrive. The reason
              is because Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Veritatis tempora dicta assumenda nam quis id eius,
              consectetur maxime obcaecati corrupti odio a, temporibus labore,
              sint vel asperiores recusandae unde delectus.
            </p>
            <FormGroup>
              <InputGroup size="lg" addonType="append">
                <Label>
                  I have read and agree to the above terms and conditions
                </Label>
                <Input type="checkbox" required />
              </InputGroup>
            </FormGroup>
            <div className="w-100 d-flex justify-content-center my-5">
              <Button type="submit">Place Order</Button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  currentUser: state.user.currentUser,
  orderGroupName: state.shop.shopSettings.orderGroupName,
  marketDayFee: state.shop.shopSettings.marketDayFee,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
