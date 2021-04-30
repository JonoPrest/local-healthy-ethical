import React, { useState, useEffect } from "react";
import "./InvoiceTemplate.css";

const InvoiceTemplate = ({ userOrder, shopSettings }) => {
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    const invoiceDate = new Date();
    const formatedDate = invoiceDate.toISOString().slice(0, 10);
    setDate(formatedDate);

    const reduceTotal = userOrder.cart.reduce(
      (accumulator, cartItem) => accumulator + Number(cartItem.total),
      0
    );

    const newTotal = reduceTotal;

    setTotal(newTotal.toFixed(2));
  }, [userOrder, shopSettings]);

  return (
    <div
      className="px-4 border m-4 invoiceContainer"
      style={{ overflowX: "auto", maxWidth: "100vw" }}
    >
      <div className=" container bootstrap snippets bootdeys">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default invoice" id="invoice">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-6 top-left"></div>

                  <div className="col-sm-6 top-right">
                    <h3 className="marginright">
                      INVOICE #{userOrder.invoiceNumber}
                    </h3>
                    <span className="marginright">{date}</span>
                  </div>
                </div>
                <div>
                  <div className="row detailsRow">
                    <div className="col-xs-4 to text-left mr-3">
                      <p>To:</p>
                      <strong className="lead marginbottom">
                        {userOrder.user.displayName}
                      </strong>
                      <p>Email: {userOrder.user.email}</p>
                    </div>

                    <div className="col-xs-4 from text-left mr-4">
                      <p> From :</p>
                      <strong className="lead marginbottom">
                        Local+ Healthy + Ethical
                      </strong>
                      <br />
                      <p>14 Lynx Cl</p>
                      <p>Lakeside, 7945</p>
                      <p>Phone: 082 453 4799‬</p>
                      <p>Email: obree.kate@gmail.com</p>
                    </div>

                    <div className="col-xs-4 text-left payment-details ml-1">
                      <p className="lead marginbottom payment-info">
                        Payment details
                      </p>
                      <p>Name: K.A Obree</p>
                      <p>Bank: FNB</p>
                      <p>Account Number: 62167667222</p>
                      <p>Branch: 250655</p>
                      <p>
                        (Please use your <strong>Name</strong> and <br />
                        <strong>Invoice Number</strong> as a reference)
                      </p>
                    </div>
                  </div>

                  <div className="row table-row">
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
                        {userOrder.cart.map((cartItem, i) => {
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
                                    {Price < 0
                                      ? (Price * -1).toFixed(2)
                                      : Price}
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
                      </tbody>
                    </table>
                  </div>

                  <div className="BottomText">
                    <div className="col-xs-6 text-right invoice-total ">
                      <h3>Total: R{total} </h3>
                    </div>

                    <div className="col-xs-6 margintop thanks">
                      <h4 className="lead marginbottom">
                        Thank you for buying better with us. Kindly pay for your
                        goods within two days of receipt.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
