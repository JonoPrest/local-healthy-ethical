import { updateInvoice } from "firebaseUtilities";
import { getInvoice } from "firebaseUtilities";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import InvoiceTemplate from "./InvoiceTemplate";
import InvoiceTemplateEditable from "./InvoiceTemplateEditable";

const IndividualOrderInvoice = () => {
  const { name } = useParams();
  const [userOrder, setUserOrder] = useState({
    invoiceNumber: "",
    user: {
      displayName: "",
    },
    cart: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editingInvoice, setEditingInvoice] = useState(false);

  useEffect(() => {
    getInvoice(name).then((res) => {
      setUserOrder(res);
      setIsLoading(false);
    });
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrderCart = userOrder.cart.map((cartItem, i) => {
      const itemQuantity = Number(e.target.quantity[i].value);
      const itemPrice = Number(e.target.price[i].value).toFixed(2);
      const itemTotal = Number(e.target.total[i].value).toFixed(2);

      return {
        item: { ...cartItem.item, Price: itemPrice },
        total: itemTotal,
        quantity: itemQuantity,
      };
    });

    const newUserOrder = { ...userOrder, cart: updatedOrderCart };

    setUserOrder(newUserOrder);

    setIsLoading(true);
    updateInvoice(newUserOrder, name)
      .then(() => {
        setEditingInvoice(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setEditingInvoice(false);
        setIsLoading(false);
        alert("Changes not saved due to the following reason: " + err.message);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : editingInvoice ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InvoiceTemplateEditable
              userOrder={userOrder}
              setUserOrder={setUserOrder}
            />
            <button
              type="submit"
              className="btn btn-success m-1"
              id="invoice-print"
            >
              <i className="fa fa-save"></i> Save Edits
            </button>
            <button
              onClick={() => setEditingInvoice(false)}
              className="btn btn-danger m-1"
              id="invoice-print"
            >
              <i className="fa fa-remove"></i> Discard Changes
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{userOrder.user.displayName} - Order Invoice</h2>
          <InvoiceTemplate userOrder={userOrder} />
          <button
            onClick={() => setEditingInvoice(true)}
            className="btn btn-danger m-1"
            id="invoice-print"
          >
            <i className="fa fa-edit"></i> Edit Invoice
          </button>
          <button className="btn btn-success m-1" id="invoice-print">
            <i className="fa fa-print"></i> Print Invoice
          </button>
          <button className="btn btn-secondary m-1">
            <i className="fa fa-envelope-o"></i> Mail Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default IndividualOrderInvoice;
