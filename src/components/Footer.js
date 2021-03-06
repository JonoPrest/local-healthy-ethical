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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer  className="footer footer-black footer-white bg-dark">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  data-placement="bottom"
                  href="https://www.facebook.com/"
                  target="_blank"
                  title="Like us on Facebook"
                >
                  <i className="fa fa-facebook-square" style={{fontSize: "20px"}}/>
                  {/* <p className="d-lg-none">Facebook</p> */}
                </a>
              </li>
              <li>
                <a
                  data-placement="bottom"
                  href="https://www.instagram.com/"
                  target="_blank"
                  title="Follow us on Instagram"
                >
                  <i className="fa fa-instagram" style={{fontSize: "20px"}}/>
                  {/* <p className="d-lg-none">Instagram</p> */}
                </a>
              </li>
            </ul>
          </nav>
          {/* <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Creative Tim
            </span>
          </div> */}
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
