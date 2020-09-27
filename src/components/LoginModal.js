import React from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal } from "reactstrap";
import { Link } from "react-router-dom";

import { auth, signInWithGoogle } from "components/firebaseUtilities";

function LoginModal({ loginModal, setLoginModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setLoginModal(false);
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <Modal
        isOpen={loginModal}
        toggle={() => setLoginModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setLoginModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h6 className="text-muted">Welcome</h6>
          <h3 className="modal-title text-center">Local Healthy Ethical</h3>
          <p>Log in to your account</p>
        </div>
        <Button className="btn w-50 mx-auto" color="blue"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Email</label>
              <Input defaultValue="" placeholder="Email" type="text" />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <Input defaultValue="" placeholder="Password" type="password" />
            </FormGroup>
            <Button block className="btn-round" color="default" type="submit">
              Sign In
            </Button>
          </form>
        </div>
        <div className="modal-footer no-border-footer">
          <span className="text-muted text-center">
            Looking{" "}
            <Link to="/register" onClick={() => setLoginModal(false)}>
              create an account
            </Link>
            ?
          </span>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
