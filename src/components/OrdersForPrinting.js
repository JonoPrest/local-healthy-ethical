import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getAllInvoices } from "firebaseUtilities";
import { useReactToPrint } from "react-to-print";
import { Button } from "reactstrap";

const OrdersForPrinting = ({ shopSettings }) => {
	const [invoicesArray, setInvoicesArray] = useState([]);

	useEffect(() => {
		getAllInvoices()
			.then((res) => setInvoicesArray(res))
			.catch(console.log);
	}, []);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<>
			<Button onClick={handlePrint}>Print</Button>
			<div ref={componentRef}>
				{invoicesArray.map((invoice) => (
					<div>
						<h2>Invoice #{invoice.invoiceNumber}</h2>
						<h3>{invoice.user.displayName}</h3>
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
										</tr>
									);
								})}
								<tr className="text-right tr">
									<td>{invoice.cart.length + 1}</td>
									<td>Market Day Fee</td>
									<td className="text-right rightAlign">1</td>
									<td className="text-right rightAlign">
										<span>R{shopSettings.marketDayFee}</span>
									</td>
									<td className="text-right rightAlign">
										<span>R{shopSettings.marketDayFee}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	shopSettings: state.shop.shopSettings,
});

export default connect(mapStateToProps)(OrdersForPrinting);
