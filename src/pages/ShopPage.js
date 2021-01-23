import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner, Button } from "reactstrap";
import { Link, Route, Redirect, Switch } from "react-router-dom";

import { fetchShopDataStartAsync } from "redux/shop/shop.actions";

import "./ShopPage.css";

// core components
import Header from "components/Headers/Header";
import CategoryCard from "components/CategoryCard";
import AllCategoriesPage from "pages/AllCategoriesPage";
import IndividualCategoriesPage from "pages/IndividualCategoriesPage";

const allCatImg = require("assets/img/splash-image.jpg");

const ShopPage = ({
	shopData,
	isFetching,
	errorMessage,
	fetchShopDataStartAsync,
}) => {
	useEffect(() => {
		fetchShopDataStartAsync();
	}, [fetchShopDataStartAsync]);

	const uniqueCategoryArray = shopData.filter((value, index, self) => {
		return (
			self.findIndex((v) => v.Category === value.Category) === index &&
			value.Category !== "" &&
			value.Category !== "Title"
		);
	});

	return (
		<div>
			<Header title="Shop" imgName="shop-cover.jpg" />
			{isFetching && shopData.length === 0 ? (
				<div
					style={{ height: `calc(60vh - 85px)`, width: "100%" }}
					className="d-flex flex-column justify-content-center align-items-center"
				>
					<h2 className="p-3 text-center">Shop Items Loading</h2>
					<Spinner />
				</div>
			) : errorMessage ? (
				<div
					style={{ height: `calc(60vh - 85px)`, width: "100%" }}
					className="d-flex flex-column justify-content-center align-items-center"
				>
					<h2 className="p-3 text-center">
						There was an error loading the shop. Please try again.
					</h2>
					<Button onClick={fetchShopDataStartAsync}>Try Again</Button>
				</div>
			) : (
				<div className="shopContainer">
					<Switch>
						<Route
							exact
							path="/shop"
							render={(props) => {
								return (
									<div className="d-flex flex-wrap justify-content-center">
										<Link to="/shop/all">
											<CategoryCard
												{...props}
												title="All Categories"
												imgUrl={allCatImg}
											/>
										</Link>
										{uniqueCategoryArray.map((category, i) => {
											return (
												<Link key={i} to={`/shop/${category.Category}`}>
													<CategoryCard
														{...props}
														title={category.Category}
														imgUrl={category.Image}
													/>
												</Link>
											);
										})}
									</div>
								);
							}}
						/>
						<Route
							path="/shop/all"
							render={(props) => (
								<AllCategoriesPage
									{...props}
									data={shopData}
									uniqueCategoryArray={uniqueCategoryArray}
								/>
							)}
						/>

						{uniqueCategoryArray.map((category, i) => {
							const products = shopData.filter((value) => {
								return value.Category === category.Category;
							});
							return (
								<Route
									key={i}
									path={`/shop/${category.Category}`}
									render={(props) => (
										<IndividualCategoriesPage
											{...props}
											products={products}
											title={category.Category}
										/>
									)}
								/>
							);
						})}

						<Redirect to="/shop" />
					</Switch>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	shopData: state.shop.shopData,
	isFetching: state.shop.isFetching,
	errorMessage: state.shop.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
	fetchShopDataStartAsync: () => dispatch(fetchShopDataStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
