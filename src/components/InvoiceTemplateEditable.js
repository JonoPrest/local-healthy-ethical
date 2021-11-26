import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceEditingInput from "./InvoiceEditingInput";

const InvoiceTemplateEditable = ({
  editedOrder,
  setEditedOrder,
  shopSettings,
}) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const reduceTotal = editedOrder.cart.reduce(
      (accumulator, cartItem) => accumulator + Number(cartItem.total),
      0
    );

    setTotal(reduceTotal.toFixed(2));
  }, [editedOrder]);

  const removeItemFromOrder = (i) => {
    const editCart = editedOrder.cart.filter((item, index) => index !== i);

    const updatedEditedOrder = {
      ...editedOrder,
      cart: editCart,
    };

    setEditedOrder(updatedEditedOrder);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const blankOrderObject = {
      item: {
        AddedItem: true,
        Price: "0.00",
        Item: "",
        Supplier: "",
      },
      quantity: 1,
      total: "0.00",
    };

    const currentCart = editedOrder.cart;
    const newCart = [...currentCart, blankOrderObject];
    const updatedEditedOrder = { ...editedOrder, cart: newCart };

    setEditedOrder(updatedEditedOrder);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;

    const currentCart = editedOrder.cart;

    switch (name) {
      case "Quantity":
        currentCart[i].item[name] = value;
        currentCart[i].quantity = 1;

        const price =
          currentCart[i].item.PricePerKg *
          (currentCart[i].item.Units === "g"
            ? currentCart[i].item.Quantity / 1000
            : currentCart[i].item.Quantity);

        currentCart[i].item.Price = price.toFixed(2);
        currentCart[i].total = price.toFixed(2);
        break;
      case "Price":
        currentCart[i].item[name] = value;
        currentCart[i].total = (
          currentCart[i].quantity * currentCart[i].item.Price
        ).toFixed(2);
        break;
      case "quantity":
        currentCart[i][name] = value;
        currentCart[i].total = (
          currentCart[i].quantity * currentCart[i].item.Price
        ).toFixed(2);
        break;
      case "Item":
        currentCart[i].item[name] = value;
        break;
      case "total":
        currentCart[i][name] = value;
        break;
      default:
        return;
    }

    const updatedEditedOrder = { ...editedOrder, cart: currentCart };

    setEditedOrder(updatedEditedOrder);
  };

  return (
    <div
      className="px-4 border m-4 invoiceContainer"
      style={{ overflow: "auto", maxWidth: "100vw" }}
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
                      INVOICE #{editedOrder.invoiceNumber}
                    </h3>
                    <span className="marginright">14 April 2014</span>
                  </div>
                </div>
                <div>
                  <InvoiceDetails userOrder={editedOrder} />

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
                          <th style={{ width: "40%" }}>Item</th>
                          <th>Supplier</th>
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
                        {editedOrder.cart.map((cartItem, i) => {
                          return (
                            <tr key={`editableInvoiceRow-${i}`}>
                              <td>
                                <Button onClick={() => removeItemFromOrder(i)}>
                                  <i className="fa fa-remove" />
                                </Button>
                              </td>
                              <td className="text-center">{i + 1}</td>
                              {!cartItem.item.AddedItem ? (
                                <td>
                                  {cartItem.item.Item} {cartItem.item.Quantity}
                                  {cartItem.item.Units}
                                </td>
                              ) : (
                                <td>
                                  <Input
                                    className="mx-1"
                                    name="Item"
                                    value={cartItem.item.Item}
                                    onChange={(e) => handleChange(e, i)}
                                  />
                                </td>
                              )}
                              <td>{cartItem.item.Supplier}</td>
                              {cartItem.item.PricePerKg ? (
                                <td>
                                  <span className="d-flex align-items-center">
                                    <InvoiceEditingInput
                                      initialValue={
                                        cartItem.item.Quantity *
                                        cartItem.quantity
                                      }
                                      name="Quantity"
                                      onChange={(e) => handleChange(e, i)}
                                    />
                                    <span>{cartItem.item.Units}</span>
                                  </span>
                                </td>
                              ) : (
                                <td className="text-right">
                                  <InvoiceEditingInput
                                    initialValue={cartItem.quantity}
                                    name="quantity"
                                    onChange={(e) => handleChange(e, i)}
                                  />
                                </td>
                              )}

                              <td className="text-right ">
                                {cartItem.item.PricePerKg ? (
                                  <span className="d-flex align-items-center">
                                    R{cartItem.item.PricePerKg} <br />
                                    (Per kg)
                                  </span>
                                ) : (
                                  <span className="d-flex align-items-center">
                                    R
                                    <InvoiceEditingInput
                                      initialValue={cartItem.item.Price}
                                      name="Price"
                                      onChange={(e) => handleChange(e, i)}
                                    />
                                  </span>
                                )}
                              </td>
                              <td className="text-right">
                                <span className="d-flex align-items-center">
                                  R
                                  <InvoiceEditingInput
                                    name="total"
                                    initialValue={cartItem.total}
                                    onChange={(e) => handleChange(e, i)}
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td></td>
                          <td></td>
                          <td>
                            <button
                              onClick={(e) => handleAddItem(e)}
                              className="btn btn-secondary m-1"
                            >
                              Add Item
                              <i className="fa fa-plus"></i>{" "}
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="">
                    <div className="col-xs-6 text-right invoice-total w-100  d-flex align-items-center justify-content-end">
                      <span className="">Total: R{total}</span>
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
