import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { updateInvoice } from "firebaseUtilities";
import { getInvoice } from "firebaseUtilities";

import { useReactToPrint } from "react-to-print";

import { useParams } from "react-router";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import InvoiceTemplate from "./InvoiceTemplate";
import InvoiceTemplateEditable from "./InvoiceTemplateEditable";
import { addHtmlAndStyling } from "./InvoiceTemplateStylingHtml";
import { sendInvoice } from "../utils/mailUtils";
import { removeOrder } from "../firebaseUtilities";

const IndividualOrderInvoice = ({ month, shopSettings }) => {
  const { name } = useParams();
  const orderObject = {
    invoiceNumber: "",
    user: {
      displayName: "",
      email: "",
    },
    cart: [],
  };
  const [deleteInvModal, setDeleteInvModal] = useState(true);
  const [userOrder, setUserOrder] = useState(orderObject);
  const [editedOrder, setEditedOrder] = useState(orderObject);

  const [isLoading, setIsLoading] = useState(true);
  const [editingInvoice, setEditingInvoice] = useState(false);

  const [deletingOrder, setDeletingOrder] = useState(false);
  const [deletingOrderMsg, setDeletingOrderMsg] = useState(null);

  const [mailButton, setMailButton] = useState({
    message: "MAIL INVOICE",
    color: "primary",
  });

  useEffect(() => {
    //print settings
    const style = document.createElement("style");
    style.innerHTML = `@page {size: portrait}`;
    style.id = "page-orientation";
    document.head.appendChild(style);

    //loading in the correct invoice
    getInvoice(name).then((res) => {
      setUserOrder(res);
      setEditedOrder(res);
      setIsLoading(false);
    });
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserOrder(editedOrder);

    setIsLoading(true);
    updateInvoice(editedOrder, name)
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
  const handleSendEmail = () => {
    setMailButton({ message: "SENDING", color: "primary" });
    const emailContent = addHtmlAndStyling(componentRef.current.innerHTML);
    sendInvoice(userOrder, emailContent)
      .then(() => {
        setMailButton({ message: "SENT", color: "success" });
        setTimeout(
          () => setMailButton({ message: "MAIL INVOICE", color: "primary" }),
          1500
        );
      })
      .catch(() => {
        setMailButton({ message: "SOMETHING WENT WRONG", color: "danger" });
        setTimeout(
          () => setMailButton({ message: "MAIL INVOICE", color: "primary" }),
          1500
        );
      });
  };

  const handleDelete = () => {
    const orderGroupId = month;
    const invoiceNumber = userOrder.invoiceNumber;

    setDeletingOrder(true);
    setDeletingOrderMsg("Deleting...");
    removeOrder({ orderGroupId, invoiceNumber })
      .then(() => {
        setDeletingOrder(false);
        setDeletingOrderMsg("Successfully deleted");
      })
      .catch((err) => {
        console.error(err);
        setDeletingOrderMsg(`Error: ${err.message}`);
      });
  };

  const toggleDeleteInvModal = () => setDeleteInvModal((prev) => !prev);

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
              shopSettings={shopSettings}
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
            <InvoiceTemplate
              shopSettings={shopSettings}
              userOrder={userOrder}
            />
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

          <button onClick={handleSendEmail} className="btn btn-secondary m-1">
            <i className="fa fa-envelope"></i> {mailButton.message}
            {mailButton.message === "SENDING" && (
              <Spinner size="sm" className="ml-2" />
            )}
            {mailButton.message === "SENT" && (
              <i className="ml-2 nc-icon nc-check-2" />
            )}
            {mailButton.message === "SOMETHING WENT WRONG" && (
              <i className="ml-2 nc-icon nc-simple-remove" />
            )}
          </button>
          <button className="btn btn-danger m1">
            <i className="fa fa-trash"></i>Remove Invoice
          </button>
        </div>
      )}
      <Modal
        isOpen={deleteInvModal}
        toggle={deletingOrder ? () => null : toggleDeleteInvModal}
      >
        <ModalHeader toggle={deletingOrder ? () => null : toggleDeleteInvModal}>
          Delete Invoice {userOrder.invoiceNumber}
        </ModalHeader>
        <ModalBody className="d-flex flex-column justify-content-center align-items-center">
          {deletingOrder && <Spinner />}
          {deletingOrderMsg
            ? deletingOrderMsg
            : "Are you sure you want to remove this order? Once you click delete this will not be recoverable."}
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center p-4">
          <Button
            disabled={deletingOrder}
            color="danger"
            onClick={handleDelete}
          >
            Delete (I'm sure)
          </Button>
          <Button
            disabled={deletingOrder}
            color="secondary"
            onClick={deletingOrder ? () => null : toggleDeleteInvModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopSettings: state.shop.shopSettings,
});

export default connect(mapStateToProps)(IndividualOrderInvoice);
