import React from "react";

const InvoiceDetails = ({ userOrder }) => {
  return (
    <div className="row detailsRow">
      <div className="col-xs-4 to text-left mr-3">
        <p>To:</p>
        <strong className="lead marginbottom">
          {userOrder.user.displayName}
        </strong>
        <p>Email: {userOrder.user.email}</p>
      </div>

      <div className="col-xs-4 from text-left mr-4">
        <p> From :</p>
        <strong className="lead marginbottom">Local+ Healthy + Ethical</strong>
        <br />
        <p>14 Lynx Cl</p>
        <p>Lakeside, 7945</p>
        <p>Phone: +27 60 365 6430</p>
        <p>Email: localhealthyethical@gmail.com</p>
      </div>

      <div className="col-xs-4 text-left payment-details ml-1">
        <p className="lead marginbottom payment-info">Payment details</p>
        <p>Name: Nkosinathi Chibwe</p>
        <p>Bank: FNB</p>
        <p>Account Number: 62845234476</p>
        <p>Branch: 250655</p>
        <p>
          (Please use your <strong>Name</strong> and <br />
          <strong>Invoice Number</strong> as a reference)
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetails;
