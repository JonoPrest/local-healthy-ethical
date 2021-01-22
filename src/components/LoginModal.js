import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, FormGroup, Input, Modal } from "reactstrap";
import { Link } from "react-router-dom";

import { auth, signInWithGoogle } from "firebaseUtilities";
import { sendForgotPasswordEmail } from "firebaseUtilities";

function LoginModal({ loginModal, setLoginModal }) {
	const [forgotPassword, setForgotPassword] = useState(false);

	useEffect(() => {
		setForgotPassword(false);
	}, [loginModal]);
	const handleSubmit = (e) => {
		e.preventDefault();
		let email = e.target.email.value;
		let password = e.target.password.value;
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setLoginModal(false);
			})
			.catch((err) => alert(err.message));
	};

	const handleForgotPassword = (e) => {
		e.preventDefault();
		sendForgotPasswordEmail(e.target.email.value).then(() => {
			setLoginModal(false);
			setForgotPassword(false);
		});
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
				<Button
					className="btn  w-50 mx-auto"
					onClick={() => {
						signInWithGoogle();
						setLoginModal(false);
					}}
				>
					Sign in with Google
				</Button>
				<div className="modal-body">
					{!forgotPassword ? (
						<form onSubmit={handleSubmit}>
							<FormGroup>
								<label>Email</label>
								<Input
									defaultValue=""
									placeholder="Email"
									type="text"
									name="email"
								/>
							</FormGroup>
							<FormGroup>
								<label>Password</label>
								<Button
									className="btn-link"
									onClick={(e) => {
										e.preventDefault();
										setForgotPassword(true);
									}}
									style={{ float: "right" }}
								>
									Forgot Password?
								</Button>
								<Input
									defaultValue=""
									placeholder="Password"
									type="password"
									name="password"
								/>
							</FormGroup>
							<Button block className="btn-round" color="primary" type="submit">
								Sign In
							</Button>
						</form>
					) : (
						<form onSubmit={handleForgotPassword}>
							<FormGroup>
								<label>Which email would you like to reset?</label>
								<Button
									className="btn-link"
									onClick={(e) => {
										e.preventDefault();
										setForgotPassword(false);
									}}
									href="#"
									style={{ float: "right" }}
								>
									Return to Sign In
								</Button>
								<Input
									defaultValue=""
									placeholder="Email"
									name="email"
									type="text"
								/>
							</FormGroup>

							<Button block className="btn-round" color="default" type="submit">
								Send Reset Email
							</Button>
						</form>
					)}
				</div>
				<div className="modal-footer no-border-footer">
					<span className="text-muted text-center">
						Looking to{" "}
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
