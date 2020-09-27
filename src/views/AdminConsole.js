import React, { useState, useEffect } from "react";
import { getFirebaseUserInfo } from "components/firebaseUtilities";

import { Table } from "reactstrap";

import CartHeader from "components/Headers/CartHeader";

const AdminConsole = ({ data }) => {
  const [allData, setAllData] = useState([]);
  const [allOrders, setAllOrders] = useState({});
  useEffect(() => {
    getFirebaseUserInfo().then(async (res) => {
      await setAllData(res);
      getMasterOrder();
    });
  }, []);

  const getMasterOrder = () => {
    let masterOrder = {};

    allData.forEach((orderItem) => {
      const productData = data.filter((product) => {
        return product.Code === orderItem.code;
      });

      const product = productData[0];

      masterOrder[orderItem.code] = {
        product: product,
        orderQuantity: 0,
      };
    });

    allData.forEach((orderItem) => {
      masterOrder[orderItem.code].orderQuantity += orderItem.orderQuantity;
    });

    const masterOrderArray = Object.keys(masterOrder);
    setAllOrders(masterOrderArray);
  };

  return (
    <div>
      <CartHeader />
      <div style={{ height: `calc(60vh - 85px)` }}>
        <Table onClick={getMasterOrder}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminConsole;
