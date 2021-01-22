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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	auth,
	createUserProfileDocument,
	signInWithGoogle,
} from "firebaseUtilities";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";

function RegisterPage() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const history = useHistory();

	React.useEffect(() => {
		document.body.classList.add("register-page");
		return function cleanup() {
			document.body.classList.remove("register-page");
		};
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let displayName = e.target[0].value;
		let email = e.target[1].value;
		let password = e.target[2].value;
		let confirmPassword = e.target[3].value;

		if (password !== confirmPassword) {
			setMessage("Passwords don't match.");
			setLoading(false);
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });
			setLoading(false);

			history.push("/");
		} catch (error) {
			console.error(error);
			setMessage(error.message);
			setLoading(false);
		}
	};

	return (
		<>
			<div
				className="page-header"
				style={{
					backgroundImage:
						"url(" + require("assets/img/splash-image.jpg") + ")",
					minHeight: `calc(100vh - 85px)`,
				}}
			>
				<div className="filter" />
				<Container style={{ marginTop: "200px" }}>
					<Row>
						<Col className="ml-auto mr-auto" lg="4">
							<Card className="card-register bg-dark ml-auto mr-auto">
								<h3 className="title mx-auto">Welcome</h3>
								<div className="social-line text-center">
									<Button
										className="btn"
										style={{ backgroundColor: "#4885ed	" }}
										onClick={signInWithGoogle}
									>
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
										type="password"
										name="confirmPassword"
										required
									/>
									<h4>{message}</h4>
									<Button
										type="submit"
										block
										className="btn-round"
										color="primary"
									>
										{loading ? <Spinner size="small" /> : "Register"}
									</Button>
								</Form>
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
