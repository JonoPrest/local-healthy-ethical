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
import React from "react";
import { connect } from "react-redux";

// reactstrap components
import { Button, Container } from "reactstrap";

import { Link } from "react-router-dom";

// core components

function LandingPageHeader({ currentUser, shopSettings, setLoginModal }) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/splash-image.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 style={{ letterSpacing: "5px" }}>Local Healthy Ethical</h1>
            <h3>Buying good food made easy.</h3>
            <br />

            {currentUser ? (
              currentUser.userAccepted && shopSettings.shopIsLive ? (
                <Button
                  to="/shop"
                  tag={Link}
                  className="btn-round mr-1"
                  color="neutral"
                  outline
                >
                  SHOP NOW
                </Button>
              ) : (
                <a href="#contact">
                  <Button className="btn-round mr-1" color="neutral" outline>
                    Get in touch
                  </Button>
                </a>
              )
            ) : (
              <Button
                onClick={() => setLoginModal(true)}
                className="btn-round mr-1"
                color="neutral"
                outline
              >
                SIGN IN
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  shopSettings: state.shop.shopSettings,
});

export default connect(mapStateToProps)(LandingPageHeader);
