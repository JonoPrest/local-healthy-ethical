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
import { sendOrderConfirmation } from "../utils/mailUtils";
import LongScrollingModal from "components/LongScrollingModal";
import Spinner from "reactstrap/lib/Spinner";
import TermsAndConditions from "../components/TermsAndConditions";

const CheckoutPage = ({
  cart,
  total,
  currentUser,
  clearCart,
  orderGroupName,
  marketDayFee,
}) => {
  const [screenMessage, setScreenMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("waiting");

  useEffect(() => {
    if (orderStatus === "waiting") {
      setScreenMessage("");
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
      setLoading(true);
      setOrderStatus("placing");
      createUserOrder(currentUser, cart, orderGroupName, marketDayFee)
        .then(() => {
          setOrderStatus("placed");
          return handleSendEmail();
        })
        .then((res) => {
          clearCart();
          if (res === "sent") {
            setOrderStatus("complete");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setOrderStatus("error");
          setLoading(false);
        });
    } else {
      setScreenMessage("Please sign in before proceeding.");
    }
  };

  return (
    <>
      <Header title="Checkout" imgName="cart-cover.jpeg" />
      <BackButton />
      {loading ? (
        <div
          style={{
            backgroundColor: "rgba(242, 242, 242, 0.95)",
            position: "fixed",
            zIndex: "20",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="p-3 text-center">Processing Order</h2>
          <Spinner />
        </div>
      ) : null}
      <div>
        {screenMessage ? (
          <div
            style={{ height: `calc(60vh - 85px)`, width: "100%" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <h2 style={{ maxWidth: "800px" }} className="p-3 text-center">
              {screenMessage}
            </h2>
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
              <div ref={componentRef}>
                <div className="invoice-box">
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr className="heading">
                        <th>Quantity</th>
                        <th>Item</th>

                        <th>Price</th>
                        <th>Total</th>
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
                            <td>R{item.item.Price}</td>
                            <td>
                              R{(item.item.Price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td>1</td>
                        <td>Market Day Fee</td>
                        <td>{`R${marketDayFee.toFixed(2)}`}</td>
                        <td>{`R${marketDayFee.toFixed(2)}`}</td>
                      </tr>

                      <tr className="total">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{`Total: R${(
                          Number(total) + Number(marketDayFee)
                        ).toFixed(2)}`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="description m-5 d-flex flex-column"
                style={{ maxWidth: "700px" }}
              >
                <h4 className="info-title text-center">Terms & Conditions</h4>
                <TermsAndConditions preview />

                <LongScrollingModal
                  title="Terms and Conditions"
                  buttonText="see more"
                  buttonClassName="btn-link btn-primary"
                >
                  <TermsAndConditions />
                </LongScrollingModal>
              </div>
              <FormGroup>
                <InputGroup size="lg" addonType="append">
                  <Label>I agree to the above terms and conditions</Label>
                  <Input type="checkbox" required />
                </InputGroup>
              </FormGroup>
              <div className="w-100 d-flex justify-content-center my-5">
                <Button type="submit">Place Order</Button>
              </div>
            </div>
          </Form>
        )}
      </div>
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
