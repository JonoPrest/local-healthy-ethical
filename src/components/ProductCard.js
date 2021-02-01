import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addItem } from "redux/cart/cart.actions";

import { Card, CardImg, CardBody, CardText, Button } from "reactstrap";
import LongScrollingModal from "./LongScrollingModal";

const noImage = require("assets/img/no-image.jpg");

const ProductCard = ({ product, addItem, supplierInfo }) => {
	const [foundSupplierInfo, setFoundSupplierInfo] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [btnText, setBtnText] = useState("Add to Cart");
	const [btnColor, setBtnColor] = useState("primary");
	const [btnDisabled, setBtnDisabled] = useState(false);

	useEffect(() => {
		const foundFromArray = supplierInfo.find(
			(supplier) => supplier.Supplier === product.Supplier
		);
		if (foundFromArray) {
			setFoundSupplierInfo(foundFromArray);
		}
	}, [product, supplierInfo]);

	const addToCartClicked = (e) => {
		e.preventDefault();
		addItem(product, quantity);
		setBtnText("Added");
		setBtnColor("success");
		setBtnDisabled(true);
		setTimeout(() => {
			setBtnText("Add to Cart");
			setBtnColor("primary");
			setBtnDisabled(false);
			setQuantity(1);
		}, 1500);
	};

	return (
		<Card
			className="mx-3 card-product"
			style={{ width: "20rem", minWidth: "20rem" }}
		>
			<CardImg
				top
				src={product.Image !== "" ? product.Image : noImage}
				alt="..."
				style={{ height: "12rem", objectFit: "cover" }}
			/>
			<CardBody>
				<h4 style={{ marginTop: "0", paddingTop: "0" }}>{product.Item}</h4>
				<CardText>
					<LongScrollingModal
						buttonClassName="btn-link btn-primary ml-0 pl-0"
						buttonText={`Supplier: ${product.Supplier}`}
						title={product.Supplier}
					>
						{foundSupplierInfo.Description ? (
							<p>{foundSupplierInfo.Description}</p>
						) : (
							<p>Sorry no info about the above supplier!</p>
						)}

						<br />
						{foundSupplierInfo.Website && (
							<div>
								<p>For more info visit their website:</p>
								<a href={foundSupplierInfo.Website}>
									{foundSupplierInfo.Website}
								</a>
							</div>
						)}
					</LongScrollingModal>
					<br />
					<strong>Container:</strong> {product.Container}
					<br />
					<strong>Quantity:</strong> {product.Quantity}
					{product.Units}
					<br />
					<strong>Price:</strong> R{product.Price}
					<br />
				</CardText>
				<form
					className="d-flex justify-content-around"
					onSubmit={addToCartClicked}
				>
					<Button color={btnColor} type="submit" disabled={btnDisabled}>
						{btnText}
						{btnText === "Added" && (
							<i
								className="nc-icon nc-check-2 ml-4"
								style={{ fontSize: "15px" }}
							/>
						)}
					</Button>
					<div className="d-flex justify-content-center">
						<input
							type="text"
							value={quantity}
							style={{ width: "30px" }}
							className="m-3"
							onChange={(e) => {
								if (!Number(e.target.value) && e.target.value !== "") return;
								setQuantity(Number(e.target.value));
							}}
						/>
						<div className="d-flex flex-column justify-content-center">
							<i
								className="nc-icon nc-simple-add rounded-circle my-1 btn btn-primary p-0"
								onClick={() => setQuantity(quantity + 1)}
							/>
							<i
								className="nc-icon nc-simple-delete rounded-circle my-1 btn btn-primary p-0"
								onClick={() => {
									if (quantity > 1) {
										setQuantity(quantity - 1);
									}
								}}
							/>
						</div>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	supplierInfo: state.shop.supplierInfo,
});

const mapDispatchToProps = (dispatch) => ({
	addItem: (item, quantity) => dispatch(addItem(item, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
