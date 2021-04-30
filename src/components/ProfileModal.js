import React, { useEffect, useState } from "react";

import { auth, deleteUserAccount, resetUserPassword } from "firebaseUtilities";
import { connect } from "react-redux";
import Button from "reactstrap/lib/Button";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Form from "reactstrap/lib/Form";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Modal from "reactstrap/lib/Modal";
import Row from "reactstrap/lib/Row";
import Spinner from "reactstrap/lib/Spinner";
import { resetCurrentUser } from "redux/user/user.actions";

const ProfileModal = ({ children, currentUser, resetCurrentUser }) => {
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [resetPassword, setResetPassword] = useState(false);
	const [removeAccount, setRemoveAccount] = useState(false);

	useEffect(() => {
		if (!modal) {
			setResetPassword(false);
			setRemoveAccount(false);
			setMessage("");
		}
	}, [modal]);

	const handlePasswordReset = (e) => {
		e.preventDefault();

		const { password, passwordConfirm } = e.target;

		if (password.value !== passwordConfirm.value) {
			setMessage("Passwords don't match.");
			return;
		}

		setLoading(true);
		resetUserPassword(password.value)
			.then((res) => {
				setMessage("Successfully updated your password.");
				setLoading(false);
				document.getElementById("resetPasswordForm").reset();
			})
			.catch((err) => {
				setMessage(err.message);
				console.log(err);
				setLoading(false);
			});
	};

	const handleRemoveAccount = () => {
		setLoading(true);
		deleteUserAccount(currentUser)
			.then((res) => {
				auth.signOut();
				setLoading(false);
				console.log(res);
				setMessage("Successfully removed account");
			})
			.catch((err) => {
				console.log(err);
				setMessage(err.message);
				setLoading(false);
			});
	};

	return (
		<div>
			<Button onClick={() => setModal(true)} color="link">
				{children}
			</Button>
			<Modal isOpen={modal} toggle={() => setModal(false)}>
				<div className="section profile-content ">
					<Container>
						<div className="owner m-3">
							<button
								aria-label="Close"
								className="close mt-3"
								data-dismiss="modal"
								type="button"
								onClick={() => setModal(false)}
							>
								<span aria-hidden={true}>×</span>
							</button>
							<div className="avatar">
								<img
									alt="..."
									className="img-circle img-no-padding img-responsive"
									src={require("assets/img/profile_placeholder.png")}
								/>
							</div>
							<div className="nameborder">
								<h4 className="title  text-center mb-0 pb-0">
									{currentUser
										? currentUser.displayName
										: "Please sign in or create an account."}
								</h4>
								<h6 className="description">
									{currentUser
										? currentUser.administrator
											? "Administrator"
											: currentUser.userAccepted
											? "User"
											: currentUser.userRejected
											? "Application Unsuccessful"
											: "Awaiting Approval"
										: null}
								</h6>
							</div>
						</div>
						{currentUser && (
							<Row>
								<Col className="ml-auto mr-auto text-center" md="6">
									{resetPassword ? (
										<div>
											<Form
												onSubmit={handlePasswordReset}
												id="resetPasswordForm"
											>
												<Label>Enter new password:</Label>
												<Input required name="password" type="password" />
												<Label>Confirm new password:</Label>
												<Input
													required
													name="passwordConfirm"
													type="password"
												/>
												<div>
													<Button
														type="submit"
														className="btn-round m-1"
														color="default"
														outline
													>
														{loading ? <Spinner /> : "Reset"}
													</Button>
													{!loading && (
														<Button
															onClick={() => setResetPassword(false)}
															outline
															color="default"
															className="btn-round m-1"
														>
															Cancel
														</Button>
													)}
												</div>
												<h4>{message}</h4>
											</Form>
										</div>
									) : (
										<div>
											<Button
												onClick={() => setResetPassword(true)}
												className="btn-round m-1"
												color="default"
												outline
											>
												Reset Password <i className="fa fa-key" />
											</Button>
											<Button
												onClick={handleRemoveAccount}
												className="btn-round m-1"
												color="default"
												outline
											>
												Remove Account <i className="fa fa-remove" />
											</Button>
										</div>
									)}
								</Col>
							</Row>
						)}
					</Container>
				</div>
			</Modal>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	resetCurrentUser: () => dispatch(resetCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
