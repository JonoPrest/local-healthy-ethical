import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { getOrderMonths } from "firebaseUtilities";

import { Table } from "reactstrap";

import Header from "components/Headers/Header";
import MonthOrders from "components/MonthOrders";

const AdminConsole = () => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    getOrderMonths().then((monthsArray) => setMonths(monthsArray));
  }, []);

  return (
    <>
      <Header title="Admin Console" imgName="cart-cover.jpeg" />
      <div
        style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Switch>
          <Route
            exact
            path="/admin"
            render={() =>
              months.map((month, i) => (
                <Link key={i} to={`/admin/${month}`}>
                  <h3>{month}</h3>
                </Link>
              ))
            }
          />
          {months.map((month, i) => (
            <Route
              key={i}
              path={`/admin/${month}`}
              render={(props) => <MonthOrders {...props} month={month} />}
            />
          ))}
          <Redirect to="/admin" />
        </Switch>
      </div>
    </>
    // <div>
    //   {/* <Header /> */}
    //   <div style={{ height: `calc(60vh - 85px)` }}>
        // <Table onClick={getMasterOrder}>
        //   <thead>
        //     <tr>
        //       <th>#</th>
        //       <th>First Name</th>
        //       <th>Last Name</th>
        //       <th>Username</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <th scope="row">1</th>
        //       <td>Mark</td>
        //       <td>Otto</td>
        //       <td>@mdo</td>
        //     </tr>
        //   </tbody>
        // </Table>
    //   </div>
    // </div>
  );
};

export default AdminConsole;
