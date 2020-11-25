import React, { useEffect, useRef, useState } from "react";

import { updateInvoice } from "firebaseUtilities";
import { getInvoice } from "firebaseUtilities";

import { useReactToPrint } from "react-to-print";

import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import InvoiceTemplate from "./InvoiceTemplate";
import InvoiceTemplateEditable from "./InvoiceTemplateEditable";

const IndividualOrderInvoice = () => {
  const { name } = useParams();
  const orderObject = {
    invoiceNumber: "",
    user: {
      displayName: "",
    },
    cart: [],
  };
  const [userOrder, setUserOrder] = useState(orderObject);
  const [editedOrder, setEditedOrder] = useState(orderObject);

  const [isLoading, setIsLoading] = useState(true);
  const [editingInvoice, setEditingInvoice] = useState(false);

  useEffect(() => {
    getInvoice(name).then((res) => {
      setUserOrder(res);
      setEditedOrder(res);
      setIsLoading(false);
    });
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrderCart = editedOrder.cart.map((cartItem, i) => {
      const itemQuantity = Number(e.target.quantity[i].value);
      const itemPrice = Number(e.target.price[i].value).toFixed(2);
      const itemTotal = Number(e.target.total[i].value).toFixed(2);

      return {
        item: { ...cartItem.item, Price: itemPrice },
        total: itemTotal,
        quantity: itemQuantity,
      };
    });

    const newUserOrder = { ...editedOrder, cart: updatedOrderCart };

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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : editingInvoice ? (
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InvoiceTemplateEditable
              editedOrder={editedOrder}
              setEditedOrder={setEditedOrder}
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
          <div ref={componentRef}>
            <InvoiceTemplate userOrder={userOrder} />
          </div>

          <button
            onClick={() => setEditingInvoice(true)}
            className="btn btn-danger m-1"
            id="invoice-print"
          >
            <i className="fa fa-edit"></i> Edit Invoice
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-success m-1"
            id="invoice-print"
          >
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
