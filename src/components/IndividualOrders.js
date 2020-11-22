import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import IndividualOrderInvoice from "./IndividualOrderInvoice";

const IndividualOrders = ({ monthOrdersArray, isLoading }) => {
  const { url, path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={`${url}`}>
          <h2>Individual Orders</h2>
          {monthOrdersArray.map((order) => (
            <Link to={`${url}/${order.invoiceNumber}`}>
              <Button className="m-1" color="neutral">
                {order.user.displayName} - {order.invoiceNumber}
                <i className="nc-icon nc-minimal-right ml-1" />
              </Button>
            </Link>
          ))}
        </Route>
        <Route path={`${path}/:name`}>
          <IndividualOrderInvoice isLoading={isLoading} monthOrdersArray={monthOrdersArray} />
        </Route>
      </Switch>
    </div>
  );
};

export default IndividualOrders;
