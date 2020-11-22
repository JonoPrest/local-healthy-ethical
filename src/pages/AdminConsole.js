import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { getOrderMonths } from "firebaseUtilities";

import { Button, Spinner, Table } from "reactstrap";

import Header from "components/Headers/Header";
import MonthOrders from "components/MonthOrders";

const AdminConsole = () => {
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrderMonths().then((monthsArray) => {
      if (monthsArray !== "error") {
        setMonths(monthsArray);
        setIsLoading(false);
      } 
    });
  }, []);

  return (
    <>
      <Header title="Admin Console" imgName="cart-cover.jpeg" />

      {isLoading ? (
        <div
          style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 className="p-3 text-center">Loading</h2>
          <Spinner />
        </div>
      ) : (
        <Switch>
          <Route
            exact
            path="/admin"
            render={() => (
              <div
                style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
                className="d-flex flex-column align-items-center"
              >
                <h2>Select month:</h2>
                {months.map((month, i) => (
                  <Link key={i} to={`/admin/${month}`}>
                    <Button className="m-2">{month}</Button>
                  </Link>
                ))}
              </div>
            )}
          />
          {months.map((month, i) => (
            <Route
              key={i}
              path={`/admin/${month}`}
              render={(props) => (
                <div
                  style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
                  className="d-flex flex-column align-items-center"
                >
                  <MonthOrders
                    style={{ minHeight: `calc(60vh - 85px)`, width: "100%" }}
                    className="d-flex flex-column align-items-center"
                    {...props}
                    month={month}
                  />
                </div>
              )}
            />
          ))}
          <Redirect to="/admin" />
        </Switch>
      )}
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
