import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { mailToSuppliers } from "utils/mailUtils";

import "./MasterTable.css";

const MasterTable = ({ monthOrdersArray, isLoading }) => {
  const [masterObject, setMasterObject] = useState({});
  const [masterArray, setMasterArray] = useState([]);
  const [suppliersArray, setSuppliersArray] = useState([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    //Print settings
    const style = document.createElement("style");
    style.innerHTML = `@page {size: landscape}`;
    style.id = "page-orientation";
    document.head.appendChild(style);

    //Creating the master object
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

  //passes the master object into an array that can be reorderd
  useEffect(() => {
    const initialArray = Object.values(masterObject).map((value) => value);
    setMasterArray(initialArray);
  }, [masterObject]);

  //sets up the list of suppliers
  useEffect(() => {
    const filteredSuppliersArray = masterArray.filter((value, index, self) => {
      return (
        self.findIndex((v) => v.item.Supplier === value.item.Supplier) ===
          index && value.Category !== ""
      );
    });

    const newSuppliersArray = filteredSuppliersArray.map((item) => ({
      name: item.item.Supplier,
      email: item.item.SupplierEmail,
    }));
    setSuppliersArray(newSuppliersArray);
  }, [masterArray]);

  const reorderArray = (e) => {
    const { innerText } = e.target;
    const editedArray = [...masterArray].sort((a, b) =>
      a.item[innerText].localeCompare(b.item[innerText])
    );

    setMasterArray(editedArray);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="my-4 mx-0 px-0">
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ maxWidth: "90vw", overflowX: "scroll" }}>
          <div ref={componentRef} className="m-5 masterTable">
            <Table>
              <thead>
                <tr>
                  <th onClick={reorderArray}>Category</th>
                  <th onClick={reorderArray}>Code</th>
                  <th onClick={reorderArray}>Item</th>
                  <th onClick={reorderArray}>Supplier</th>
                  <th onClick={reorderArray}>Container</th>
                  <th onClick={reorderArray}>Quantity</th>
                  <th onClick={reorderArray}>Units</th>
                  <th onClick={reorderArray}>Price</th>
                  <th>Units to Order</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {masterArray.map((value) => {
                  return (
                    <tr key={value.item.Code}>
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
                        R
                        {(value.quantity * Number(value.item.Price)).toFixed(2)}
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
          <UncontrolledDropdown>
            <DropdownToggle
              aria-expanded={false}
              aria-haspopup={true}
              caret
              color="secondary"
              data-toggle="dropdown"
              id="dropdownMenuButton"
              type="button"
            >
              Email individual suppliers
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuButton">
              {suppliersArray.map((supplier) => (
                <DropdownItem key={supplier.email}>
                  <a href={mailToSuppliers(masterArray, supplier)}>
                    {supplier.name}
                  </a>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <button
            onClick={handlePrint}
            className="btn btn-success m-1"
            id="invoice-print"
          >
            <i className="fa fa-print"></i> Print Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default MasterTable;
