import React, { useState } from "react";

import { Button, Modal } from "reactstrap";

const TermsAndConditionsModal = () => {
	const [scrollingLongContent, setScrollingLongContent] = useState(false);
	return (
		<>
			<Button
				style={{ margin: "0" }}
				color="link"
				type="button"
				onClick={() => setScrollingLongContent(true)}
			>
				read more...
			</Button>

			<Modal
				isOpen={scrollingLongContent}
				toggle={() => setScrollingLongContent(false)}
			>
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLongTitle">
						Terms and Conditions{" "}
					</h5>
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={() => setScrollingLongContent(false)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<p>
						Local + Healthy + Ethical is a private solidarity purchasing group
						run from a private home in Lakeside, Cape Town. We are a community
						of people who are committed to source healthy food from various
						producers as locally, directly and ethically as possible.
					</p>
					<p>
						Our group shares in the risk associated with non-delivery or
						below-standard produce.
					</p>
					<p>
						All purchases and consumption or use of any product/s are done so
						entirely at your own risk.
					</p>
					<p>
						If you order any kind of animal product through LHE (whether meat,
						dairy, fish or eggs), you do so at your own risk. We do order
						chicken, raw milk products, which you must pay special attention to
						keeping the cold chain unbroken if you order. It is your
						responsibility to bring cool boxes and ice bricks when you collect
						your orders.
					</p>
					<p>
						By ordering through this group, you agree to take all risks
						associated with any food spoilage and related or unrelated sickness
						or illness that may occur as a result of consuming any products
						purchased through the Local + Healthy + Ethical group. You also
						agree to not hold any person, agent, supplier or customer of,
						whether related or unrelated to the Local + Healthy + Ethical Club,
						responsible for any injury, sickness or financial loss that may
						occur from any interaction with the Local + Healthy + Ethical group
						and its agents.
					</p>
					<p>
						To contribute towards admin and time resources spent on this, a
						small markup has been added to products where it is reasonable. This
						will be kept as low as possible and gives us the little pat we need
						on our back for all this admin, and covers some of our valuable time
						and resource costs.
					</p>
					<p>
						It is one of our highest values to pay our suppliers as quickly as
						we can. Therefore, it is important that all members pay their
						invoices within 2 days of receipt. It is your responsibility to look
						through your final invoice to ensure that you received what you have
						been invoiced for, and you are charged for what you received. If
						there are problems with your invoice, issues must be raised within
						24 hours of receiving that invoice.
					</p>
					<p>
						By placing an order with the Local + Healthy + Ethical Club, you
						agree to all these Terms & Conditions and agree to not hold the
						Local + Healthy + Ethical Group, Kate Obree or any other person
						associated with the club, liable for any related or unrelated
						consequences or sicknesses that may or may not occur as a result of
						non-delivery or faulty/below-standard food or goods.
					</p>
				</div>
			</Modal>
		</>
	);
};

export default TermsAndConditionsModal;
