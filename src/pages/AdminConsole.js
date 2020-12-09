import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link } from "react-router-dom";
import Papa from "papaparse";

import Switch from "react-bootstrap-switch";

import { getOrderMonths } from "firebaseUtilities";

import { Col, Button, Spinner, Input, Form } from "reactstrap";

import Header from "components/Headers/Header";
import MonthOrders from "components/MonthOrders";
import { updateShopIsLive } from "firebaseUtilities";
import { setShopArray } from "firebaseUtilities";
import { fetchShopSettingsStartAsync } from "redux/shop/shop.actions";
import { updateCurrentOrderGroupName } from "firebaseUtilities";
import { getUserRequests } from "firebaseUtilities";
import { acceptUserRequest } from "firebaseUtilities";

const AdminConsole = ({
  fetchShopSettingsStartAsync,
  shopSettings,
  isFetchingSettings,
}) => {
  const [months, setMonths] = useState(null);
  const [userRequests, setUserRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("Sync");

  useEffect(() => {
    console.log("render");
    getUserRequests()
      .then((res) => {
        setUserRequests(res);
      })
      .catch(console.log);
    getOrderMonths()
      .then((monthsArray) => setMonths(monthsArray))
      .then(() => fetchShopSettingsStartAsync())
      .catch(console.log);
  }, [fetchShopSettingsStartAsync]);

  useEffect(() => {
    if (months && userRequests && !isFetchingSettings) {
      setIsLoading(false);
    }
  }, [months, isFetchingSettings, userRequests]);

  const handleShopLiveSwitch = (shopIsLiveState) => {
    updateShopIsLive(!shopIsLiveState).then(() =>
      fetchShopSettingsStartAsync()
    );
  };

  //Bit of a hack because I couldn't figure out how to return a promise from papa parse quickly enough

  const getGoogleSheetData = () => {
    setSyncMessage("Syncing");
    setIsSyncing(true);
    const proxyUrl = "https://agile-anchorage-79298.herokuapp.com/";
    const apiURL =
      "https://docs.google.com/spreadsheets/d/1T2EV-ArYBTgchH1h89pqK0ffc77EDTffItpNqoHosd0/export?format=csv";

    // Get google sheet data using papa parse

    Papa.parse(proxyUrl + apiURL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      comments: "#",
      complete: function (results) {
        const data = results.data;
        //Hack fix because papa parse is giving an empty prop with empty attribute causing issues with firebase
        const remappedData = data.map((item) => {
          delete item[""];
          return item;
        });
        setShopArray(remappedData)
          .then(() => {
            setSyncMessage("Sync Successful");
            setTimeout(() => setSyncMessage("Sync"), 2000);
            setIsSyncing(false);
          })
          .catch(() => {
            setSyncMessage("Something Went Wrong, Try Again");
            setTimeout(() => setSyncMessage("Sync"), 2000);
            setIsSyncing(false);
          });
      },
      error: (error) => {
        setSyncMessage("Something Went Wrong, Try Again");
        setTimeout(() => setSyncMessage("Sync"), 2000);
        setIsSyncing(false);
      },
    });
  };

  const handleSetCurrentOrderGroupName = (e) => {
    e.preventDefault();
    updateCurrentOrderGroupName(e.target.newName.value).then(() =>
      fetchShopSettingsStartAsync()
    );
  };

  const handleAcceptUserRequest = (user, e) => {
    e.preventDefault();

    acceptUserRequest(user)
      .then(() => getUserRequests())
      .then((res) => {
        setUserRequests(res);
      })
      .catch(console.log);
  };

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
        <div
          style={{ minHeight: `calc(60vh - 85px)` }}
          className="d-flex justify-content-center"
        >
          <Route
            exact
            path="/admin"
            render={() => (
              <div
                style={{ maxWidth: "1200px" }}
                className="d-flex flex-wrap justify-content-around w-100"
              >
                <Col
                  xl="4"
                  lg="8"
                  md="8"
                  sm="8"
                  xs="8"
                  className="d-flex flex-column align-items-center "
                >
                  <div className="d-flex flex-column align-items-center border-bottom w-100 p-4">
                    <h2>Set Shop Live</h2>
                    <Switch
                      defaultValue={shopSettings.shopIsLive}
                      onColor="primary"
                      offColor="primary"
                      onChange={() =>
                        handleShopLiveSwitch(shopSettings.shopIsLive)
                      }
                    />
                  </div>
                  <div className="border-bottom d-flex flex-column align-items-center p-4">
                    <h2 className="text-center">Sync Shop With Google Sheet</h2>
                    <Button onClick={getGoogleSheetData} className="mt-3">
                      <span>{syncMessage}</span>
                      {isSyncing ? (
                        <Spinner
                          className="ml-1"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                      ) : (
                        <i className="fas fa-sync ml-1"></i>
                      )}
                    </Button>
                  </div>
                  <div className="d-flex flex-column align-items-center text-center border-bottom w-100 p-4">
                    <h2>Set Current Order Group Name</h2>
                    <h4>
                      Current Name:{" "}
                      <strong>{shopSettings.orderGroupName}</strong>{" "}
                    </h4>
                    <Form
                      className="d-flex w-100"
                      onSubmit={handleSetCurrentOrderGroupName}
                    >
                      <Input name="newName" pattern="[A-Za-z0-9_-]+" />
                      <Button type="submit">Submit</Button>
                    </Form>
                  </div>
                </Col>

                <Col
                  xl="4"
                  lg="5"
                  md="6"
                  sm="8"
                  xs="8"
                  className="d-flex flex-column p-4 border-bottom"
                >
                  <h2>User Requests:</h2>
                  <div  style={{ height: "500px", overflowY: "auto" }}>
                    {userRequests.map((user, i) => (
                      <div className="card p-2">
                        <div>
                          <p>
                            <strong>{user.displayName}</strong>
                          </p>
                          <p> {user.email}</p>
                        </div>
                        <div>
                          <Button
                            className="m-1"
                            color="success"
                            onClick={(e) => handleAcceptUserRequest(user, e)}
                          >
                            <i className="fa fa-check"></i>
                          </Button>
                          <Button className="m-1" color="danger">
                            <i className="fa fa-remove" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col
                  xl="4"
                  lg="5"
                  md="6"
                  sm="8"
                  xs="8"
                  className="d-flex flex-column  p-4 border-bottom"
                >
                  <h2>Select Orders:</h2>
                  <div
                    className="d-flex flex-column"
                    style={{ height: "500px", overflowY: "auto" }}
                  >
                    {months.map((month, i) => (
                      <Link className="card p-2" key={i} to={`/admin/${month}`}>
                        <h5 style={{ margin: "0" }}>{month}</h5>
                      </Link>
                    ))}
                  </div>
                </Col>
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
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  shopSettings: state.shop.shopSettings,
  isFetchingSettings: state.shop.isFetchingSettings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShopSettingsStartAsync: () => dispatch(fetchShopSettingsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminConsole);
