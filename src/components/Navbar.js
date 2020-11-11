/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "firebaseUtilities";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Badge,
} from "reactstrap";

function ExamplesNavbar({ setLoginModal, currentUser, cartItems }) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity,
        0
      )
    );
  }, [cartItems]);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 199 ||
        document.body.scrollTop > 199
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 200 ||
        document.body.scrollTop < 200
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            title="Local Healthy Ethical"
            tag={Link}
          >
            {currentUser ? (
              <div>
                <i
                  className="nc-icon nc-single-02 mr-2"
                  style={{ fontSize: "15px" }}
                />
                {currentUser.displayName}
              </div>
            ) : (
              "Welcome"
            )}
          </NavbarBrand>

          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/" tag={Link}>
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/shop" tag={Link}>
                SHOP
              </NavLink>
            </NavItem>
            <NavItem>
              {currentUser ? (
                <NavLink
                  onClick={() => auth.signOut()}
                  style={{ cursor: "pointer" }}
                >
                  Sign Out
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => setLoginModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              <NavLink
                to="/cart"
                tag={Link}
                alt={`${cartCount} items in your cart`}
                className="d-flex align-items-center"
              >
                <i
                  className="nc-icon nc-cart-simple"
                  style={{ fontSize: "20px" }}
                />
                <p className="d-lg-none ml-2 ">Cart</p>
                {cartCount > 0 && (
                  <Badge color="danger" className="ml-1 px-1">
                    {cartCount}
                  </Badge>
                )}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ExamplesNavbar);
