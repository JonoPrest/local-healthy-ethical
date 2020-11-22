import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "reactstrap";
import InvoiceTemplate from "./InvoiceTemplate";
import InvoiceTemplateEditable from "./InvoiceTemplateEditable";

const IndividualOrderInvoice = ({ monthOrdersArray, isLoading }) => {
  const { name } = useParams();
  const [userOrder, setUserOrder] = useState({
    invoiceNumber: "",
    user: {
      displayName: "",
    },
    cart: [],
  });
  const [editingInvoice, setEditingInvoice] = useState(false);

  useEffect(() => {
    const order = monthOrdersArray.find(
      (order) => order.invoiceNumber === Number(name)
    );
    console.log(order);
    if (order) {
      setUserOrder(order);
    }
  }, [monthOrdersArray, name]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : editingInvoice ? (
        <div>
          <InvoiceTemplateEditable
            userOrder={userOrder}
            setUserOrder={setUserOrder}
          />
          <button
            onClick={() => setEditingInvoice(false)}
            className="btn btn-success m-1"
            id="invoice-print"
          >
            <i className="fa fa-save"></i> Save Edits
          </button>
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
