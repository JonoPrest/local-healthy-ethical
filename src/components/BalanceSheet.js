import React, { useState, useEffect } from "react";
import { getInvoicesForGivenMonth } from "firebaseUtilities";
import Table from "reactstrap/lib/Table";
import Spinner from "reactstrap/lib/Spinner";

const BalanceSheet = ({ monthOrdersArray }) => {
  const [loading, setLoading] = useState(false);
  const [invoiceArray, setInvoiceArray] = useState([]);

  let cummulativeTotal = 0;

  useEffect(() => {
    setLoading(true);
    getInvoicesForGivenMonth(monthOrdersArray)
      .then((res) => {
        setInvoiceArray(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [monthOrdersArray]);

  return (
    <div className="m-4">
      <h2>Balance Sheet</h2>
      {loading ? (
        <Spinner />
      ) : (
        <Table className="m-3">
          <thead>
            <th>Name:</th>
            <th>Invoice Number:</th>
            <th>Total:</th>
          </thead>
          {invoiceArray.map((invoice) => {
            const cartTotal = invoice.cart.reduce(
              (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + Number(cartItem.total),
              0
            );

            cummulativeTotal += cartTotal;

            return (
              <tr>
                <td className="text-left">{invoice.user.displayName}</td>
                <td className="text-right">{invoice.invoiceNumber}</td>
                <td className="text-right">R{cartTotal.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td className="text-right">Total income:</td>
            <td className="text-right">R{cummulativeTotal.toFixed(2)}</td>
          </tr>
        </Table>
      )}
    </div>
  );
};

export default BalanceSheet;
