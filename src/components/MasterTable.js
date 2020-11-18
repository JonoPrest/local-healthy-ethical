import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

const MasterTable = ({ monthOrdersArray }) => {
  const [masterObject, setMasterObject] = useState({});

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
  }, []);

  return (
    <div>
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
          {Object.values(masterObject).map((value, i) => (
            <tr>
              <th>{value.item.Category}</th>
              <th>{value.item.Code}</th>
              <th>{value.item.Item}</th>
              <th>{value.item.Supplier}</th>
              <th>{value.item.Container}</th>
              <th>{value.item.Quantity}</th>
              <th>{value.item.Units}</th>
              <th>{value.item.Price}</th>
              <th>{value.quantity}</th>
              <th>R{(value.quantity * Number(value.item.Price)).toFixed(2)}</th>
            </tr>
          ))}
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MasterTable;
