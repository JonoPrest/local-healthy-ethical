import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "firebaseUtilities";
import Papa from "papaparse";

import { setCurrentUser } from "redux/user/user.actions";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import LoginModal from "components/LoginModal";
import NucleoIcons from "pages/NucleoIcons.js";
import LandingPage from "pages/LandingPage.js";
import ShopPage from "pages/ShopPage.js";
import CartPage from "pages/CartPage.js";
import CheckoutPage from "pages/CheckoutPage";
import RegisterPage from "pages/RegisterPage.js";
import AdminConsole from "pages/AdminConsole";
// others
import DemoFooter from "components/Footer.js";
import ExamplesNavbar from "components/Navbar.js";

const App = ({ cart, setCurrentUser }) => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [total, setTotal] = useState("0.00");

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setLoginModal(false);
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    const proxyUrl = "https://agile-anchorage-79298.herokuapp.com/";
    const apiURL =
      "https://docs.google.com/spreadsheets/d/1T2EV-ArYBTgchH1h89pqK0ffc77EDTffItpNqoHosd0/export?format=csv";

    //Get google sheet data using papa parse

    Papa.parse(proxyUrl + apiURL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      comments: "#",
      complete: function (results) {
        setData(results.data);
        setDataLoaded(true);
      },
    });
  }, []);

  useEffect(() => {
    let cummulativeTotal = 0;
    cart.forEach((item) => {
      let price = Number(item.item.Price);
      let quantity = Number(item.quantity);
      let subTotal = price * quantity;
      cummulativeTotal += subTotal;
    });
    setTotal(cummulativeTotal.toFixed(2));
  }, [cart]);

  return (
    <div>
      <ExamplesNavbar setLoginModal={setLoginModal} />
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <Switch>
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route exact path="/" render={(props) => <LandingPage {...props} />} />
        <Route
          path="/shop"
          render={(props) => (
            <ShopPage {...props} data={data} dataLoaded={dataLoaded} />
          )}
        />
        <Route
          exact
          path="/cart"
          render={(props) => <CartPage {...props} total={total} />}
        />
        <Route
          path="/cart/checkout"
          render={(props) => <CheckoutPage {...props} total={total} />}
        />
        <Route
          exact
          path="/admin"
          render={(props) => (
            <AdminConsole data={data} dataLoaded={dataLoaded} {...props} />
          )}
        />
        <Route
          path="/register"
          render={(props) => <RegisterPage {...props} />}
        />
        <Redirect to="/" />
      </Switch>
      <DemoFooter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userAuth) => dispatch(setCurrentUser(userAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
