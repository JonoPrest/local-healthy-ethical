import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import InvoiceEditingInput from "./InvoiceEditingInput";

const InvoiceTemplateEditable = ({ userOrder, setUserOrder }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const reduceTotal = userOrder.cart.reduce(
      (accumulator, cartItem) =>
        accumulator + Number(cartItem.item.Price) * cartItem.quantity,
      0
    );

    setTotal(reduceTotal.toFixed(2));
  }, [userOrder]);

  const removeItemFromOrder = (i) => {
    let cart = userOrder.cart;
    cart.splice(i, 1);

    const updatedUserOrder = {
      ...userOrder,
      cart: cart,
    };

    setUserOrder(updatedUserOrder);
  };

  const editItem = (inputValue, cartItem, i, property) => {

  };

  return (
    <div className="px-4 border m-4">
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
                    <span className="marginright">14 April 2014</span>
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

                    <div className="col-xs-4 from text-left">
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

                    <div className="col-xs-4 text-left ml-4 payment-details">
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
                            Remove
                          </th>
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
                            <tr>
                              <td>
                                <Button onClick={() => removeItemFromOrder(i)}>
                                  <i className="fa fa-remove" />
                                </Button>
                              </td>
                              <td className="text-center">{i + 1}</td>
                              <td>
                                {cartItem.item.Item} {cartItem.item.Quantity}
                                {cartItem.item.Units}
                              </td>
                              <td className="text-right">
                                <InvoiceEditingInput
                                  editItem={(inputValue) =>
                                    editItem(
                                      inputValue,
                                      cartItem,
                                      i,
                                      "quantity"
                                    )
                                  }
                                  initialValue={cartItem.quantity}
                                />
                              </td>

                              <td className="text-right ">
                                <span className="d-flex align-items-center">
                                  R
                                  <InvoiceEditingInput
                                    editItem={editItem}
                                    initialValue={cartItem.item.Price}
                                  />
                                </span>
                              </td>
                              <td className="text-right">
                                <span className="d-flex align-items-center">
                                  R
                                  <InvoiceEditingInput
                                    editItem={editItem}
                                    initialValue={(
                                      Number(cartItem.item.Price) *
                                      cartItem.quantity
                                    ).toFixed(2)}
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="">
                    <div className="col-xs-6 text-right invoice-total w-100  d-flex align-items-center justify-content-end">
                      <span className="">Total: R</span>
                      <InvoiceEditingInput initialValue={total} />
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

export default InvoiceTemplateEditable;
