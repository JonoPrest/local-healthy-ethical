import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button } from "reactstrap";
import "./OrdersForPrinting.css";
import Spinner from "reactstrap/lib/Spinner";
import { getInvoicesForGivenMonth } from "firebaseUtilities";

const OrdersForPrinting = ({ shopSettings, monthOrdersArray }) => {
	const [invoicesArray, setInvoicesArray] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getInvoicesForGivenMonth(monthOrdersArray)
			.then((res) => {
				setInvoicesArray(res);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, [monthOrdersArray]);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return loading ? (
		<Spinner />
	) : (
		<>
			<Button onClick={handlePrint}>
				<i className="fa fa-print mr-1"></i>Print
			</Button>
			<div ref={componentRef}>
				<div className="ordersForPrinting">
					{invoicesArray.map((invoice) => {
						const reduceTotal = invoice.cart.reduce(
							(accumulator, cartItem) => accumulator + Number(cartItem.total),
							0
						);

						const total = reduceTotal + Number(shopSettings.marketDayFee);

						return (
							<div className="individualInvoice">
								<div className="invoiceName">
									<h2>Invoice #{invoice.invoiceNumber}</h2>
									<h2>{invoice.user.displayName}</h2>
								</div>
								<table className="table table-striped">
									<thead>
										<tr className="tr">
											<th className="text-center" style={{ width: "5%" }}>
												#
											</th>
											<th style={{ width: "50%" }}>Item</th>
											<th
												className="text-right rightAlign"
												style={{ width: "15%" }}
											>
												Quantity
											</th>
											<th
												className="text-right rightAlign"
												style={{ width: "15%" }}
											>
												Unit Price
											</th>
											<th
												className="text-right rightAlign"
												style={{ width: "15%" }}
											>
												Total Price
											</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{invoice.cart.map((cartItem, i) => {
											const {
												Item,
												Quantity,
												PricePerKg,
												Units,
												Price,
											} = cartItem.item;
											return (
												<tr key={`invoiceRow-${i}`} className="tr">
													<td className="text-center">{i + 1}</td>
													<td>
														{Item} {Quantity}
														{Units}
													</td>
													<td className="text-right rightAlign">
														{PricePerKg
															? `${Quantity * cartItem.quantity}${Units}`
															: cartItem.quantity}
													</td>

													<td className="text-right rightAlign">
														{PricePerKg ? (
															<span className="d-flex justify-content-end rightAlign">
																R{PricePerKg} <br />
																(Per kg)
															</span>
														) : (
															<span className="text-right rightAlign">
																{Price < 0 && "- "}R
																{Price < 0 ? (Price * -1).toFixed(2) : Price}
															</span>
														)}
													</td>
													<td className="text-right rightAlign">
														{cartItem.total < 0
															? `-R${(cartItem.total * -1).toFixed(2)}`
															: `R${cartItem.total}`}
													</td>
													<td className="checkbox"></td>
													<td className="checkbox"></td>
												</tr>
											);
										})}
										<tr className="tr">
											<td>{invoice.cart.length + 1}</td>
											<td>Market Day Fee</td>
											<td className="text-right rightAlign">1</td>
											<td className="text-right rightAlign">
												<span>R{shopSettings.marketDayFee}</span>
											</td>
											<td className="text-right rightAlign">
												<span>R{shopSettings.marketDayFee}</span>
											</td>
											<td className="checkbox"></td>
											<td className="checkbox"></td>
										</tr>
									</tbody>
								</table>
								<div className="BottomText">
									<div className="col-xs-6 text-right invoice-total ">
										<h3>Total: R{total.toFixed(2)} </h3>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	shopSettings: state.shop.shopSettings,
});

export default connect(mapStateToProps)(OrdersForPrinting);
