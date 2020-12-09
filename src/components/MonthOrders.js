import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { getOrdersForGivenMonth } from "firebaseUtilities";

import MasterTable from "components/MasterTable";
import { Button } from "reactstrap";
import BackButton from "components/BackButton";
import IndividualOrders from "./IndividualOrders";

const MonthOrders = ({ month }) => {
  const { url, path } = useRouteMatch();
  const [monthOrders, setMonthOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getOrdersForGivenMonth(month).then((ordersArray) => {
      setMonthOrders(ordersArray);
      setIsLoading(false);
    });
  }, [month]);
  return (
    <div className="text-center">
      <Switch>
        <Route exact path={`/admin/${month}`}>
          <BackButton />
          <h1>
            <strong>{month}</strong>
          </h1>
          <Link to={`${url}/master-table`}>
            <Button className="m-2">See Master Table</Button>
          </Link>
          <Link to={`${url}/orders`}>
            <Button className="m-2">See individual Orders</Button>
          </Link>
        </Route>
        <Route path={`${path}/master-table`}>
          <BackButton />
          <h1>
            <strong>{month}</strong>
          </h1>
          <h2>Master Table</h2>
          <MasterTable monthOrdersArray={monthOrders} isLoading={isLoading} />
        </Route>
        <Route path={`${path}/orders`}>
          <BackButton />
          <h1>
            <strong>{month}</strong>
          </h1>

          <IndividualOrders
            monthOrdersArray={monthOrders}
            isLoading={isLoading}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default MonthOrders;
