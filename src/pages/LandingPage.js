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

import { connect } from "react-redux";

// reactstrap components
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardTitle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
	Spinner,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import { sendMail } from "../utils/mailUtils";

function LandingPage({ setLoginModal, currentUser }) {
	React.useEffect(() => {
		document.body.classList.add("profile-page");
		return function cleanup() {
			document.body.classList.remove("profile-page");
		};
	}, [currentUser]);

	const [mailButton, setMailButton] = useState({
		message: "SEND MESSAGE",
		color: "primary",
	});

	const handleContactSubmit = (e) => {
		e.preventDefault();

		setMailButton({ message: "SENDING", color: "primary" });

		const { name, emailContent, email } = e.target;
		const mail = {
			name: name.value,
			emailContent: emailContent.value,
			email: email.value,
		};
		console.log(mail);

		sendMail(mail)
			.then(() => {
				setMailButton({ message: "SENT", color: "success" });
				const form = document.getElementById("contact-form");
				form.reset();
				setTimeout(
					() => setMailButton({ message: "SEND MESSAGE", color: "primary" }),
					1500
				);
			})
			.catch(() => {
				setMailButton({ message: "SOMETHING WENT WRONG", color: "danger" });
				setTimeout(
					() => setMailButton({ message: "SEND MESSAGE", color: "primary" }),
					1500
				);
			});
	};
	return (
		<>
			<LandingPageHeader setLoginModal={setLoginModal} />
			<div className="main">
				<div className="section text-center">
					<Container>
						<Row>
							<blockquote class="trello-card">
								<a href="https://trello.com/c/NI3lkHYe/213-terms-and-conditions">
									Terms and conditions
								</a>
							</blockquote>
							<script src="https://p.trellocdn.com/embed.min.js"></script>
							<Col className="ml-auto mr-auto" md="8">
								<iframe
									src="https://trello.com/c/OKVduwHL.html"
									frameBorder="0"
									width="340"
									height="220"
								></iframe>

								<iframe
									src="https://trello.com/c/NI3lkHYe.html"
									frameBorder="0"
									width="100%"
									height="600"
								></iframe>
								<h2 className="title">Welcome!</h2>
								<h5 className="description">
									<p>
										Buying local (from as nearby as possible), healthy (as
										little chemical interference as possible) and ethical food
										(in as much as we can gather is kind to people who harvest
										it, the environment and animals) is a bit of a challenge
										these days as we find ourselves so busy and often
										disconnected from where our food comes from. We’re often so
										oblivious to the practices around how we get to eat what we
										eat.
									</p>

									<p>The Local + Healthy + Ethical group</p>

									<p>
										A desire to bring the food experience from similar groups
										we've been part of (Good Food Clubs as started by Liesl
										Stewart) inspired the start of this group. Our experience of
										eating wholesome food with a good story behind it brings
										peace to our plates, and enables us to "vote with our
										wallets" as to the kinds of businesses we want to support
										and see growth in in our country.
									</p>

									<p>
										Buying from food and goods producers as directly as
										possible, discovering who the local farmers are,
										prioritising black-owned business and female owned business,
										buying organic or non-gmo, asking questions about ethical
										wages for workers, prioritizing good treatment of animals
										and the environment are the things we’re grappling with as
										we choose and work with suppliers.
									</p>

									<p>
										We are not an exclusive or gourmet food club, but an
										alternative way of shopping. In some cases, this will mean
										buying organic, in others, non-gmo. In other ways it means
										prioritising ethical or local buying. The idea here is not
										to buy foods that are the best bargain, but rather to buy
										“better”.
									</p>

									<p>
										Sometimes the food is more expensive than at the
										supermarket, but sometimes it is cheaper. We’re finding that
										a lot of the time it is cheaper. It is very hard (almost
										impossible) to buy perfectly, so here’s to doing the best we
										can!
									</p>

									<p>
										Another massive value we like to practice is kindness - we
										are a human-run club and we still have a lot to learn. Our
										suppliers are human too, so we do all we can do be a
										different kind of consumer.
									</p>

									<p>
										Please check and double check your invoices that everything
										is correct. Our new website will be up from January 2021
										which will hopefully sort out some of our admin faux paux's!
										Please also understand that some months certain things might
										not arrive because they’re not in stock. The food may also
										not be as you expect it to be - the milk may be too creamy,
										and the lack of preservatives in certain items may mean a
										shorter shelf life.
									</p>

									<p>
										We do hope you will find many things that work for you. You
										may have to try a few things out! Buying good food is not
										necessarily always convenient :) so please keep this in
										mind.
									</p>

									<p>
										Please follow the links provided on this board to find out
										more about the products you are ordering. We have provided
										some basic detail, but the rest is up to you.
									</p>

									<p>
										Lastly, we’d love to hear your feedback, your questions and
										the things that matter to you, and in as much as is possible
										we will try to incorporate them into our practices. We are
										by no means food gurus, but we’re excited to walk alongside
										you and figure things out along the way.
									</p>

									<p>Peace and good food to you!</p>

									<p>❤️</p>

									<p>Kate</p>
								</h5>
								<br />
								<Button
									className="btn-round"
									color="primary"
									href="#pablo"
									onClick={(e) => e.preventDefault()}
								>
									See Details
								</Button>
							</Col>
						</Row>
						<br />
						<br />
						<Row>
							<Col md="6">
								<div className="primary">
									<div className="icon icon-info">
										<i className="nc-icon nc-alert-circle-i" />
									</div>
									<div className="description">
										<h4 className="info-title">How the Group Works</h4>
										<p className="description">
											Planning on buying just one or two things, or not every
											month? Not a problem. Skipping a month? Also fine...
										</p>
										<Button className="btn-link" color="primary" href="#pablo">
											See more
										</Button>
									</div>
								</div>
							</Col>
							<Col md="6">
								<div className="primary">
									<div className="icon icon-info">
										<i className="nc-icon nc-paper" />
									</div>
									<div className="description">
										<h4 className="info-title">Ts & Cs</h4>
										<p>
											Terms and Conditions Local + Healthy + Ethical is a
											private solidarity purchasing group run from a private
											home in Lakeside, Cape Town. We are a community of people
											who are committed to source food from various producers as
											locally, directly and ethically as possible...
										</p>
										<Button className="btn-link" color="primary" href="#pablo">
											See more
										</Button>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				<blockquote className="trello-card">
					<a href="https://trello.com/c/fyaJKT6Y/1-localhealthyethical-the-concept">
						Local+healthy+Ethical - The concept
					</a>
				</blockquote>
				<script src="https://p.trellocdn.com/embed.min.js"></script>
				<div className="section section-dark text-center">
					<Container>
						<h2 className="title">The Team</h2>
						<Row>
							<Col md="4">
								<Card className="card-profile card-plain">
									<div className="card-avatar">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
											/>
										</a>
									</div>
									<CardBody>
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<div className="author">
												<CardTitle tag="h4">Henry Ford</CardTitle>
												<h6 className="card-category">Product Manager</h6>
											</div>
										</a>
										<p className="card-description text-center">
											Teamwork is so important that it is virtually impossible
											for you to reach the heights of your capabilities or make
											the money that you want without becoming very good at it.
										</p>
									</CardBody>
									<CardFooter className="text-center">
										<Button
											className="btn-just-icon btn-neutral"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-twitter" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-google-plus" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-linkedin" />
										</Button>
									</CardFooter>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-profile card-plain">
									<div className="card-avatar">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												src={require("assets/img/faces/joe-gardner-2.jpg")}
											/>
										</a>
									</div>
									<CardBody>
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<div className="author">
												<CardTitle tag="h4">Sophie West</CardTitle>
												<h6 className="card-category">Designer</h6>
											</div>
										</a>
										<p className="card-description text-center">
											A group becomes a team when each member is sure enough of
											himself and his contribution to praise the skill of the
											others. No one can whistle a symphony. It takes an
											orchestra to play it.
										</p>
									</CardBody>
									<CardFooter className="text-center">
										<Button
											className="btn-just-icon btn-neutral"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-twitter" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-google-plus" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-linkedin" />
										</Button>
									</CardFooter>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-profile card-plain">
									<div className="card-avatar">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												src={require("assets/img/faces/erik-lucatero-2.jpg")}
											/>
										</a>
									</div>
									<CardBody>
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<div className="author">
												<CardTitle tag="h4">Robert Orben</CardTitle>
												<h6 className="card-category">Developer</h6>
											</div>
										</a>
										<p className="card-description text-center">
											The strength of the team is each individual member. The
											strength of each member is the team. If you can laugh
											together, you can work together, silence isn’t golden,
											it’s deadly.
										</p>
									</CardBody>
									<CardFooter className="text-center">
										<Button
											className="btn-just-icon btn-neutral"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-twitter" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-google-plus" />
										</Button>
										<Button
											className="btn-just-icon btn-neutral ml-1"
											color="link"
											href="#pablo"
											onClick={(e) => e.preventDefault()}
										>
											<i className="fa fa-linkedin" />
										</Button>
									</CardFooter>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
				<div className="section landing-section">
					<Container>
						<Row>
							<Col className="ml-auto mr-auto" md="8">
								<h2 className="text-center">Get in Touch!</h2>
								<Form
									onSubmit={handleContactSubmit}
									className="contact-form"
									id="contact-form"
								>
									<Row>
										<Col md="6">
											<label>Name</label>
											<InputGroup>
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="nc-icon nc-single-02" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													name="name"
													placeholder="Name"
													type="text"
													required
												/>
											</InputGroup>
										</Col>
										<Col md="6">
											<label>Email</label>
											<InputGroup>
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="nc-icon nc-email-85" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													name="email"
													placeholder="Email"
													type="email"
													required
												/>
											</InputGroup>
										</Col>
									</Row>
									<label>Message</label>
									<Input
										name="emailContent"
										placeholder="Tell us your thoughts and feelings..."
										type="textarea"
										rows="4"
										required
									/>
									<Row>
										<Col className="ml-auto mr-auto" md="4">
											<Button
												type="submit"
												className="btn-fill"
												color={mailButton.color}
												size="lg"
											>
												{mailButton.message}
												{mailButton.message === "SENDING" && (
													<Spinner size="sm" className="ml-2" />
												)}
												{mailButton.message === "SENT" && (
													<i className="ml-2 nc-icon nc-check-2" />
												)}
												{mailButton.message === "SOMETHING WENT WRONG" && (
													<i className="ml-2 nc-icon nc-simple-remove" />
												)}
											</Button>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(LandingPage);
