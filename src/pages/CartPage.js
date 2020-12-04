import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

// core components
import Header from "components/Headers/Header";
import CartRow from "components/CartRow";
import BackButton from "components/BackButton";

const CartPage = ({ cart, updateCart, total, marketDayFee }) => {
  return (
    <div>
      <Header title="Cart" imgName="cart-cover.jpeg" />
      <BackButton />
      {cart.length < 1 ? (
        <div
          style={{ height: `calc(60vh - 85px)`, width: "100%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="p-3 text-center">Your Cart is Currently Empty</h2>
          <Button to="/shop" tag={Link}>
            Go to Shop
          </Button>
        </div>
      ) : (
        <Container fluid style={{ maxWidth: "800px" }} className="my-5">
          <Row className="mt-4">
            <Col></Col>
            <Col>Item</Col>
            <Col>Price</Col>
            <Col>Quantity</Col>
            <Col>Total</Col>
          </Row>

          {cart.map((item, i) => {
            return (
              <CartRow
                key={item.item.Code}
                index={i}
                itemInfo={item}
                updateCart={updateCart}
              />
            );
          })}

          <Row className="mt-4 text-right">
            <Col></Col>
            <Col></Col>

            <Col>
              <h5>
                <strong>Subtotal:</strong>
              </h5>
            </Col>
            <Col>
              <h5>R{total}</h5>
            </Col>
          </Row>

          <Row className="mt-4 text-right">
            <Col></Col>
            <Col></Col>

            <Col>
              <h5>
                <strong>Market Day Fee:</strong>
              </h5>
            </Col>
            <Col>
              <h5>R{marketDayFee}</h5>
            </Col>
          </Row>

          <Row className="mt-4 text-right">
            <Col></Col>
            <Col></Col>
           
            <Col>
              <h3>
                <strong>Total:</strong>
              </h3>
            </Col>
            <Col>
              <h3 >
                R{(Number(total) + Number(marketDayFee)).toFixed(2)}
              </h3>
              <Button className="my-3" to="/cart/checkout" tag={Link}>
                Checkout
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="w-100 d-flex justify-content-end">
                <p className="text-right" style={{ maxWidth: "300px" }}>
                  This is an estimate. Final amounts may vary slightly once the
                  order arrives.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
  marketDayFee: state.shop.shopSettings.marketDayFee,
});

export default connect(mapStateToProps)(CartPage);
