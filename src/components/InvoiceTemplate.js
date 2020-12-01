import React, { useState, useEffect } from "react";
import "./InvoiceTemplate.css";

const InvoiceTemplate = ({ userOrder }) => {
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

    setTotal(reduceTotal.toFixed(2));
  }, [userOrder]);

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
                  <div className="row">
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

                    <div className="col-xs-4 text-left payment-detailss ml-1">
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
                        <tr>
                          <th className="text-center" style={{ width: "5%" }}>
                            #
                          </th>
                          <th style={{ width: "50%" }}>Item</th>
                          <th className="text-right" style={{ width: "15%" }}>
                            Quantity
                          </th>
                          <th className="text-right" style={{ width: "15%" }}>
                            Unit Price
                          </th>
                          <th className="text-right" style={{ width: "15%" }}>
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrder.cart.map((cartItem, i) => {
                          return (
                            <tr key={`invoiceRow-${i}`}>
                              <td className="text-center">{i + 1}</td>
                              <td>
                                {cartItem.item.Item} {cartItem.item.Quantity}
                                {cartItem.item.Units}
                              </td>
                              <td className="text-right">
                                {cartItem.item.PricePerKg
                                  ? `${
                                      cartItem.item.Quantity * cartItem.quantity
                                    }${cartItem.item.Units}`
                                  : cartItem.quantity}
                              </td>

                              <td className="text-right">
                                {cartItem.item.PricePerKg ? (
                                  <span className="d-flex align-items-center">
                                    R{cartItem.item.PricePerKg} <br />
                                    (Per kg)
                                  </span>
                                ) : (
                                  <span>R{cartItem.item.Price}</span>
                                )}
                              </td>
                              <td className="text-right">R{cartItem.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="">
                    <div className="col-xs-6 text-right invoice-total ">
                      <h3>Total: R{total} </h3>
                    </div>

                    <div className="col-xs-6 margintop ">
                      <p className="lead marginbottom">THANK YOU!</p>
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
