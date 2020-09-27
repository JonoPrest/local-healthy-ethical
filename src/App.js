import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "components/firebaseUtilities";
import Papa from "papaparse";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import LoginModal from "components/LoginModal";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/LandingPage.js";
import ShopPage from "views/ShopPage/ShopPage.js";
import CartPage from "views/CartPage.js";
import CheckoutPage from "views/CheckoutPage/CheckoutPage";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import AdminConsole from "views/AdminConsole";
// others
import DemoFooter from "components/Footers/DemoFooter.js";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
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

  const calculateTotal = () => {
    let count = 0;

    cart.forEach((item) => {
      let price = Number(item.product.Price);
      let quantity = Number(item.quantity);
      let total = price * quantity;
      count += total;
    });
    setTotal(count.toFixed(2));
  };

  const setCartCounter = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    setCartCount(count);
  };

  const addToCart = (item) => {
    let cartArray = cart;
    cartArray.push(item);
    setCart(cartArray);
    setCartCounter();
    calculateTotal();
  };

  const removeItemFromCart = (index) => {
    let cartArray = cart;
    cartArray.splice(index, 1);
    setCart(cartArray);
  };

  const changeItemFromCart = (index, value) => {
    let cartArray = cart;
    cartArray[index].quantity = value;
    setCart(cartArray);
  };

  const updateCart = (index, action, value) => {
    if (action === "remove") {
      removeItemFromCart(index);
    } else if (action === "change") {
      changeItemFromCart(index, value);
    }
    setCartCounter();
    calculateTotal();
  };

  return (
    <div>
      <ExamplesNavbar
        cartCount={cartCount}
        setLoginModal={setLoginModal}
        currentUser={currentUser}
      />
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route exact path="/" render={(props) => <LandingPage {...props} />} />
        <Route
          path="/shop"
          render={(props) => (
            <ShopPage
              {...props}
              cart={cart}
              data={data}
              addToCart={addToCart}
              dataLoaded={dataLoaded}
            />
          )}
        />
        <Route
          exact
          path="/cart"
          render={(props) => (
            <CartPage
              {...props}
              cart={cart}
              updateCart={updateCart}
              total={total}
            />
          )}
        />
        <Route
          path="/cart/checkout"
          render={(props) => (
            <CheckoutPage
              {...props}
              cart={cart}
              total={total}
              currentUser={currentUser}
              setCart={setCart}
              setCartCount={setCartCount}
            />
          )}
        />
        <Route
          exact
          path="/admin"
          render={(props) => (
            <AdminConsole data={data} dataLoaded={dataLoaded} {...props} />
          )}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
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

export default App;
