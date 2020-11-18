import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, Link, useRouteMatch } from "react-router-dom";
import { getOrdersForGivenMonth } from "firebaseUtilities";

import MasterTable from "components/MasterTable";

const MonthOrders = ({ month }) => {
  const { url, path } = useRouteMatch();
  const [monthOrders, setMonthOrders] = useState([]);
  useEffect(() => {
    getOrdersForGivenMonth(month).then((ordersArray) => {
      console.log(ordersArray);
      setMonthOrders(ordersArray);
    });
  }, [month]);
  return (
    <div>
      <h2>{month}</h2>
      <Switch>
        <Route exact path={`/admin/${month}`}>
          <Link to={`${url}/master-table`}>
            <h1>See Master Table</h1>
          </Link>
          <Link to={`${url}/orders`}>
            <h1>See individual Orders</h1>
          </Link>
        </Route>
        <Route path={`${path}/master-table`}>
          <h1>Master Table</h1>
          <MasterTable monthOrdersArray={monthOrders} />
        </Route>
        <Route path={`${path}/orders`}>
          {/* <IndividualOrders /> */}
          <h1>Individual orders</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default MonthOrders;
