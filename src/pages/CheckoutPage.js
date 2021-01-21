import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, InputGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserOrder } from "firebaseUtilities";

import { clearCart } from "redux/cart/cart.actions";

import "./CheckoutPage.css";

// core components
import Header from "components/Headers/Header";
import BackButton from "components/BackButton";
import { addHtmlAndStylingToOrder } from "utils/hml-and-styling-for-nodemailer";
import { sendOrderConfirmation } from "../utils/mailUtils";
import LongScrollingModal from "components/LongScrollingModal";

const CheckoutPage = ({
	cart,
	total,
	currentUser,
	clearCart,
	orderGroupName,
	marketDayFee,
}) => {
	const [screenMessage, setScreenMessage] = useState("");
	const [orderStatus, setOrderStatus] = useState("waiting");

	useEffect(() => {
		if (orderStatus === "waiting") {
			setScreenMessage("");
		}
		if (cart.length === 0) {
			setScreenMessage("There are no items in your cart");
		}
		if (orderStatus === "complete") {
			setScreenMessage("Thank you, your order has been placed");
		}
		if (orderStatus === "not-sent") {
			setScreenMessage(
				"Your order was received! Unfortunately there was a problem with our mail server and we weren't able to send you your own copy."
			);
		}
		if (orderStatus === "error") {
			setScreenMessage(
				"There was an error placing your order please try again."
			);
		}
	}, [cart, orderStatus]);

	const componentRef = useRef();

	const handleSendEmail = () => {
		const emailContent = addHtmlAndStylingToOrder(
			componentRef.current.innerHTML
		);
		return sendOrderConfirmation(currentUser, emailContent)
			.then(() => {
				setOrderStatus("sent");
				return "sent";
			})
			.catch(() => {
				setOrderStatus("not-sent");
				return "not-sent";
			});
	};

	const handleOrder = (e) => {
		e.preventDefault();
		if (currentUser && currentUser.userAccepted) {
			setOrderStatus("placing");
			createUserOrder(currentUser, cart, orderGroupName)
				.then(() => {
					setOrderStatus("placed");
					handleSendEmail();
				})
				.then(() => {
					clearCart();
					if (orderStatus === "sent") {
						setOrderStatus("complete");
					}
				})
				.catch((err) => setOrderStatus("error"));
		} else {
			console.log(currentUser);
			setScreenMessage("Please sign in before proceeding.");
		}
	};

	return (
		<>
			<Header title="Checkout" imgName="cart-cover.jpeg" />
			<BackButton />
			{screenMessage ? (
				<div
					style={{ height: `calc(60vh - 85px)`, width: "100%" }}
					className="d-flex flex-column justify-content-center align-items-center"
				>
					<h2 style={{ maxWidth: "800px" }} className="p-3 text-center">
						{screenMessage}
					</h2>
					{orderStatus === "error" ? (
						<Button
							to="/cart/checkout"
							tag={Link}
							onClick={() => setOrderStatus("waiting")}
						>
							Go to checkout
						</Button>
					) : (
						<Button
							to="/shop"
							tag={Link}
							onClick={() => setOrderStatus("waiting")}
						>
							Go to Shop
						</Button>
					)}
				</div>
			) : (
				<Form onSubmit={handleOrder}>
					<div
						style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
						className="checkout-container"
					>
						<div className="title">
							<h1>Your Order:</h1>
						</div>
						<div ref={componentRef}>
							<div className="invoice-box">
								<table cellPadding="0" cellSpacing="0">
									<tbody>
										<tr className="heading">
											<td>Quantity</td>
											<td>Item</td>

											<td>Price</td>
										</tr>

										{cart.map((item, i) => {
											return (
												<tr key={i}>
													<td>{item.quantity}</td>
													<td>
														{item.item.Item +
															" (" +
															item.item.Quantity +
															item.item.Units +
															")"}
													</td>
													<td>{`R${item.item.Price}`}</td>
												</tr>
											);
										})}

										<tr>
											<td>1</td>
											<td>Market Day Fee</td>
											<td>{`R${marketDayFee}`}</td>
										</tr>

										<tr className="total">
											<td></td>
											<td></td>

											<td>{`Total: R${(
												Number(total) + Number(marketDayFee)
											).toFixed(2)}`}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div
							className="description m-5 d-flex flex-column"
							style={{ maxWidth: "700px" }}
						>
							<h4 className="info-title text-center">Terms & Conditions</h4>
							<p className="description text-justify">
								Local + Healthy + Ethical is a private solidarity purchasing
								group run from a private home in Lakeside, Cape Town. We are a
								community of people who are committed to source food from
								various producers as locally, directly and ethically as
								possible...
							</p>
							<LongScrollingModal
								title="Terms and Conditions"
								buttonText="see more"
								buttonClassName="btn-link btn-primary"
							>
								<p>
									Local + Healthy + Ethical is a private solidarity purchasing
									group run from a private home in Lakeside, Cape Town. We are a
									community of people who are committed to source healthy food
									from various producers as locally, directly and ethically as
									possible.
								</p>
								<br />
								<p>
									Our group shares in the risk associated with non-delivery or
									below-standard produce.
								</p>
								<br />
								<p>
									All purchases and consumption or use of any product/s are done
									so entirely at your own risk.
								</p>
								<br />
								<p>
									If you order any kind of animal product through LHE (whether
									meat, dairy, fish or eggs), you do so at your own risk. We do
									order chicken, raw milk products, which you must pay special
									attention to keeping the cold chain unbroken if you order. It
									is your responsibility to bring cool boxes and ice bricks when
									you collect your orders.
								</p>
								<br />
								<p>
									By ordering through this group, you agree to take all risks
									associated with any food spoilage and related or unrelated
									sickness or illness that may occur as a result of consuming
									any products purchased through the Local + Healthy + Ethical
									group. You also agree to not hold any person, agent, supplier
									or customer of, whether related or unrelated to the Local +
									Healthy + Ethical Club, responsible for any injury, sickness
									or financial loss that may occur from any interaction with the
									Local + Healthy + Ethical group and its agents.
								</p>
								<br />
								<p>
									To contribute towards admin and time resources spent on this,
									a small markup has been added to products where it is
									reasonable. This will be kept as low as possible and gives us
									the little pat we need on our back for all this admin, and
									covers some of our valuable time and resource costs.
								</p>
								<br />
								<p>
									It is one of our highest values to pay our suppliers as
									quickly as we can. Therefore, it is important that all members
									pay their invoices within 2 days of receipt. It is your
									responsibility to look through your final invoice to ensure
									that you received what you have been invoiced for, and you are
									charged for what you received. If there are problems with your
									invoice, issues must be raised within 24 hours of receiving
									that invoice.
								</p>
								<br />
								<p>
									By placing an order with the Local + Healthy + Ethical Club,
									you agree to all these Terms & Conditions and agree to not
									hold the Local + Healthy + Ethical Group, Kate Obree or any
									other person associated with the club, liable for any related
									or unrelated consequences or sicknesses that may or may not
									occur as a result of non-delivery or faulty/below-standard
									food or goods.
								</p>
								<br />
							</LongScrollingModal>
						</div>
						<FormGroup>
							<InputGroup size="lg" addonType="append">
								<Label>I agree to the above terms and conditions</Label>
								<Input type="checkbox" required />
							</InputGroup>
						</FormGroup>
						<div className="w-100 d-flex justify-content-center my-5">
							<Button type="submit">Place Order</Button>
						</div>
					</div>
				</Form>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart.cartItems,
	currentUser: state.user.currentUser,
	orderGroupName: state.shop.shopSettings.orderGroupName,
	marketDayFee: state.shop.shopSettings.marketDayFee,
});

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
