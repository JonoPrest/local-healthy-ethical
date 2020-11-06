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
import { auth, createUserProfileDocument, signInWithGoogle } from "firebaseUtilities";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let confirmPassword = e.target[3].value;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        createUserProfileDocument(res.user, { displayName });
      })
      .catch(function (error) {
        console.log(error);
        // ...
      });
  };

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/splash-image.jpg") + ")",
          height: `calc(100vh - 85px)`,
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <div className="social-line text-center">
                  <Button className="btn btn-primary" onClick={signInWithGoogle}>
                    <span>Sign In with Google</span>
                  </Button>
                </div>
                <Form onSubmit={handleSubmit} className="register-form">
                  <label>Name</label>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="displayName"
                    required
                  />
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    required
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="pasword"
                  />
                  <label>Confirm Password</label>
                  <Input
                    placeholder="Confirm Password"
                    type="text"
                    name="confirmPassword"
                    required
                  />
                  <Button
                    type="submit"
                    block
                    className="btn-round"
                    color="danger"
                  >
                    Register
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center"></div>
      </div>
    </>
  );
}

export default RegisterPage;
