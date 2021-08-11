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
import LongScrollingModal from "components/LongScrollingModal";

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
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title text-center">Welcome!</h2>
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
                </h5>
                <br />

                <LongScrollingModal
                  buttonText="Read more about us"
                  title="Welcome!"
                  buttonClassName="btn-round btn-primary"
                >
                  <h5>
                    <p>
                      Buying local, healthy and ethically produced food is a bit
                      of a challenge these days as we find ourselves
                      disconnected from where our food comes from. We’re often
                      oblivious to the practices a how around how we get to eat
                      what we eat.
                    </p>
                    <br />
                    <p>The Local + Healthy + Ethical group</p>
                    <br />

                    <p>
                      This group stems from a desire to bring the food
                      experience from similar groups we've been part of (Good
                      Food Clubs as started by Liesl Stewart and Abigail
                      Fehrson) to our own home and community in Lakeside. Eating
                      wholesome food with a good, transparent story behind it
                      brings peace to our plates. It does this because we get to
                      know what goes into our food, specifically who we are
                      supporting when we buy the food, and what the impact of
                      our consumption on the natural world is. It's empowering.
                    </p>
                    <br />

                    <p>How does this work?</p>
                    <br />

                    <p>
                      We buy food and goods directly from producers (farmers,
                      bakers, creators) with a few priorities. We source goods
                      that are locally made, with as little chemical
                      interference as possible (we can understand all the
                      ingredients on the label) and we look for suppliers that
                      pay their employees fairly and treat the earth and animals
                      with respect. We love supporting start-ups and black-owned
                      businesses too.
                    </p>
                    <br />

                    <p>Are all the goods local, healthy and ethical?</p>
                    <br />

                    <p>
                      Local // All the suppliers are South African and reside in
                      the Western Cape. Two suppliers source a portion of their
                      goods internationally, but we've taken the decision to
                      support their businesses given that a) the goods they sell
                      aren't locally available and b) they are employing a local
                      workforce, making a significant contribution to our
                      economy in that way.
                    </p>
                    <br />

                    <p>
                      Healthy // The food we buy is as free-range, organic
                      (although often uncertified) and with as little chemical
                      interference as possible. As previously mentioned, the
                      labels are understandable and the produce is hormone,
                      pesticide and GMO free.
                    </p>
                    <br />

                    <p>
                      Ethical // We want to support suppliers that are giving
                      their employees a fair share of the profits, and a wage
                      that is worthy of the time worked. We do as much as we can
                      to understand what the business relationships are like
                      behind the scenes while acknowledging that there is more
                      work to be done. We will continue to ask our suppliers the
                      difficult questions as our relationships progress.
                    </p>
                    <br />

                    <p>
                      It's very hard to buy perfectly, but it is 100% worth
                      trying. Will you join us?
                    </p>
                  </h5>
                  <br />
                </LongScrollingModal>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="6">
                <div className="primary">
                  <div className="icon icon-primary">
                    <i
                      className="nc-icon nc-alert-circle-i"
                      style={{ fontSize: "40px" }}
                    />
                  </div>
                  <div className="description">
                    <h4 className="info-title">How the Group Works</h4>
                    <p className="description text-justify">
                      Please send me a request to login on the Local Healthy
                      Ethical website, so that I can approve your request.
                      Please note that this is a private membership only club
                      with a limit of 35 spaces. If there isn't sufficient
                      space, I will let you know as soon as there is! Should you
                      not wish to order every month, that is not a problem -
                      however after 6 months of...
                    </p>
                    <LongScrollingModal
                      title="How the Group Works"
                      buttonText="see more"
                      buttonClassName="btn-link btn-primary"
                    >
                      <p>
                        Please send me a request to login on the Local Healthy
                        Ethical website, so that I can approve your request.
                        Please note that this is a private membership only club
                        with a limit of 35 spaces. If there isn't sufficient
                        space, I will let you know as soon as there is! Should
                        you not wish to order every month, that is not a problem
                        - however after 6 months of not ordering I'll get in
                        touch to find out if you're happy for me to give your
                        place to someone else.
                      </p>
                      <br />
                      <p>
                        Wait for the Watsapp announcement that orders are open
                        (usually for the first week of each month)
                      </p>
                      <br />
                      <p>
                        Login to the website and add the goods to your cart,
                        bearing in mind that you are shopping for a whole month
                        so you need to buy four times the amount you'd buy in a
                        week
                      </p>
                      <br />
                      <p>
                        Add anything else during the week to your order, should
                        you have any other epiphanies of what you might need
                      </p>
                      <br />
                      <p>
                        Come with all your bags and cool boxes and collect your
                        goods on Market Day (usually on the 2nd Friday of each
                        month). Collection is between 2pm and 6pm, with your
                        specific time to be confirmed individually. If you know
                        that you are going to be away on market day, rather
                        don't order that month as we can't promise that our pup
                        Sulwe won't get involved with your shopping if it hangs
                        around!
                      </p>
                      <br />

                      <p>
                        After market day I will send you an invoice. This helps
                        us to calculate the final amounts of goods that need
                        weighing.
                      </p>
                      <br />
                      <p>
                        Please check and double check your invoices that
                        everything is correct. Please also understand that some
                        months certain things might not arrive because they’re
                        not in stock. The food may also not be as you expect it
                        to be - the milk may be too creamy, and the lack of
                        preservatives in certain items may mean a shorter shelf
                        life. Good food is not always the most convenient!
                      </p>
                      <br />

                      <p>
                        Payments can be made into Kate’s account no later than
                        two days after you have received your invoice.
                      </p>
                      <br />
                      <p>
                        Please note that we have marked up all the goods by a
                        small amount ( it won't ever exceed 10%) to cover some
                        of the time and practical resources this good food stuff
                        takes.
                      </p>
                      <br />
                      <p>
                        We do hope you will find many things that work for you.
                        We have provided some basic detail on products but any
                        more information or clarity is for you to find out. All
                        of the website links of suppliers are available.
                      </p>
                      <br />
                      <p>
                        We'd love to hear your feedback, your questions and the
                        things that matter to you, or concern you. These
                        suppliers are yours as much as they are ours so please
                        feel free to raise any issues.
                      </p>
                      <br />
                      <p>Peace and good food to you all.</p>
                      <br />
                      <p>Kate</p>
                      <br />
                    </LongScrollingModal>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="primary">
                  <div className="icon icon-primary">
                    <i
                      className="nc-icon nc-paper"
                      style={{ fontSize: "40px" }}
                    />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Terms & Conditions</h4>
                    <p className="description text-justify">
                      Local + Healthy + Ethical is a private solidarity
                      purchasing group run from a private home in Lakeside, Cape
                      Town. We are a community of people who are committed to
                      source food from various producers as locally, directly
                      and ethically as possible...
                    </p>
                    <LongScrollingModal
                      title="Terms and Conditions"
                      buttonText="see more"
                      buttonClassName="btn-link btn-primary"
                    >
                      <p>
                        Local + Healthy + Ethical is a private solidarity
                        purchasing group run from a private home in Lakeside,
                        Cape Town. We are a community of people who are
                        committed to source healthy food from various producers
                        as locally, directly and ethically as possible.
                      </p>
                      <br />
                      <p>
                        Our group shares in the risk associated with
                        non-delivery or below-standard produce.
                      </p>
                      <br />
                      <p>
                        All purchases and consumption or use of any product/s
                        are done so entirely at your own risk.
                      </p>
                      <br />
                      <p>
                        If you order any kind of animal product through LHE
                        (whether meat, dairy, fish or eggs), you do so at your
                        own risk. We do order chicken, raw milk products, which
                        you must pay special attention to keeping the cold chain
                        unbroken if you order. It is your responsibility to
                        bring cool boxes and ice bricks when you collect your
                        orders.
                      </p>
                      <br />
                      <p>
                        By ordering through this group, you agree to take all
                        risks associated with any food spoilage and related or
                        unrelated sickness or illness that may occur as a result
                        of consuming any products purchased through the Local +
                        Healthy + Ethical group. You also agree to not hold any
                        person, agent, supplier or customer of, whether related
                        or unrelated to the Local + Healthy + Ethical Club,
                        responsible for any injury, sickness or financial loss
                        that may occur from any interaction with the Local +
                        Healthy + Ethical group and its agents.
                      </p>
                      <br />
                      <p>
                        To contribute towards admin and time resources spent on
                        this, a small markup has been added to products where it
                        is reasonable. This will be kept as low as possible and
                        gives us the little pat we need on our back for all this
                        admin, and covers some of our valuable time and resource
                        costs.
                      </p>
                      <br />
                      <p>
                        It is one of our highest values to pay our suppliers as
                        quickly as we can. Therefore, it is important that all
                        members pay their invoices within 2 days of receipt. It
                        is your responsibility to look through your final
                        invoice to ensure that you received what you have been
                        invoiced for, and you are charged for what you received.
                        If there are problems with your invoice, issues must be
                        raised within 24 hours of receiving that invoice.
                      </p>
                      <br />
                      <p>
                        By placing an order with the Local + Healthy + Ethical
                        Club, you agree to all these Terms & Conditions and
                        agree to not hold the Local + Healthy + Ethical Group,
                        Kate Obree or any other person associated with the club,
                        liable for any related or unrelated consequences or
                        sicknesses that may or may not occur as a result of
                        non-delivery or faulty/below-standard food or goods.
                      </p>
                      <br />
                    </LongScrollingModal>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-dark text-center">
          <Container>
            <h2 className="title text-center m-auto">The Coordinator</h2>
            <Row>
              <Col>
                <Card className="card-profile card-plain card-product">
                  <div className="card-avatar">
                    <img
                      alt="..."
                      src={require("assets/img/kate-profile.jpg")}
                    />
                  </div>
                  <CardBody>
                    <div className="author">
                      <CardTitle tag="h4">Kate Obree</CardTitle>
                      {/* <h6 className="card-category">Founder</h6> */}
                    </div>
                    <p className="card-description text-justify">
                      Hi there! I’m Kate. I live with my husband Robbie, my
                      daughter Vicky and our sweet hound Sulwe, on the gorgeous
                      mountain slopes of Lakeside. I’m a creative sort who has
                      dabbled in a few fields, dipping most happily and heavily
                      into the parenting one. I feel most fortunate to be
                      surrounded daily by so much beauty, and I would count
                      myself even more fortunate if I was able to share this
                      beauty with all South Africans, many of whom live lives
                      that are scarred by the inequality of our city. One of the
                      ways I have learnt to do this is by sourcing food that is
                      not only healthy for me, but pays wages worthy of hours
                      worked. Staying out of the shops and being able to afford
                      such great food are added bonuses – although I need to
                      stress that affordability is not the point. Buying better
                      is. There is much to be learnt from our side still, and
                      I’m thankful for your interest while I learn on the job. I
                      look forward to seeing you on Market Day and having you on
                      this food journey. Love, Kate
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
        <div className="section landing-section" id="contact">
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
