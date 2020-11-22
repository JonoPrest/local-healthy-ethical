import React, { useEffect, useState } from "react";
import { Spinner, Table } from "reactstrap";

const MasterTable = ({ monthOrdersArray, isLoading }) => {
  const [masterObject, setMasterObject] = useState({});
  const [total, setTotal] = useState("");

  useEffect(() => {
    let masterObj = {};
    monthOrdersArray.forEach((order) => {
      order.cart.forEach((cartItem) => {
        let quantity = cartItem.quantity;
        if (masterObj[cartItem.item.Code]) {
          quantity = masterObj[cartItem.item.Code].quantity + cartItem.quantity;
        }
        masterObj[cartItem.item.Code] = {
          item: cartItem.item,
          quantity: quantity,
        };
      });
    });
    setMasterObject(masterObj);
    let cumulativeSum = 0;
    Object.values(masterObj).forEach((value, i) => {
      cumulativeSum += Number(value.item.Price) * value.quantity;
    });
    setTotal(`R${cumulativeSum.toFixed(2)}`);
  }, [monthOrdersArray]);

  return (
    <div className="my-4 mx-0 px-0">
     
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{maxWidth: "90vw", overflowX: "scroll"}}>
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Code</th>
                <th>Item</th>
                <th>Supplier</th>
                <th>Container</th>
                <th>Quantity</th>
                <th>Units</th>
                <th>Price</th>
                <th>Units to Order</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(masterObject).map((value, i) => {
                return (
                  <tr>
                    <th className="text-left">{value.item.Category}</th>
                    <th className="text-left">{value.item.Code}</th>
                    <th className="text-left" style={{ maxWidth: "200px" }}>
                      {value.item.Item}
                    </th>
                    <th className="text-left">{value.item.Supplier}</th>
                    <th className="text-left">{value.item.Container}</th>
                    <th className="text-right">{value.item.Quantity}</th>
                    <th className="text-left">{value.item.Units}</th>
                    <th className="text-right">{value.item.Price}</th>
                    <th className="text-right">{value.quantity}</th>
                    <th className="text-right">
                      R{(value.quantity * Number(value.item.Price)).toFixed(2)}
                    </th>
                  </tr>
                );
              })}
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-right">Total:</th>
                <th className="text-right">{total}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MasterTable;
