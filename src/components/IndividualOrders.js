import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import IndividualOrderInvoice from "./IndividualOrderInvoice";

const IndividualOrders = ({ monthOrdersArray, isLoading }) => {
  const { url, path } = useRouteMatch();
  const alphabeticalMonthOrdersArray = [...monthOrdersArray].sort((a, b) =>
    a.user.displayName > b.user.displayName ? 1 : -1
  );
  return (
    <div>
      <Switch>
        <Route exact path={`${url}`}>
          <h2>Individual Orders</h2>
          <div className="d-flex flex-column">
            {alphabeticalMonthOrdersArray.map((order) => (
              <Link
                key={order.invoiceNumber}
                to={`${url}/${order.invoiceNumber}`}
              >
                <Button className="m-1" color="neutral">
                  {order.user.displayName} - {order.invoiceNumber}
                  <i className="nc-icon nc-minimal-right ml-1" />
                </Button>
              </Link>
            ))}
          </div>
        </Route>
        <Route path={`${path}/:name`}>
          <IndividualOrderInvoice isLoading={isLoading} />
        </Route>
      </Switch>
    </div>
  );
};

export default IndividualOrders;
