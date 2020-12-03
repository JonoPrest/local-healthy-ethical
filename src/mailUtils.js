import axios from "axios";

const serverUrl = "http://localhost:3001/mail";

export const sendMail = (emailObject) => {
  const { email, emailContent, name } = emailObject;
  const mailDetails = {
    from: email,
    to: "localhealthyethical@gmail.com",
    subject: `New Message from ${name}`,
    html: `<h3>From: <strong>${name}</strong></h3>
    <h3>Email: <strong>${email}</strong></h3>
    <br/>
    <h4>Message:</h4>
    <p>${emailContent}</p>`,
  };

  return axios
    .post(serverUrl, mailDetails)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const sendInvoice = (userOrder, emailContent) => {
  console.log("called");
  const { email, displayName } = userOrder.user;

  const mailDetails = {
    from: "localhealthyethical@gmail.com",
    to: ["localhealthyethical@gmail.com", email],
    subject: `Local Healthy Ethical - Invoice #${userOrder.invoiceNumber} for ${displayName}`,
    html: `
    <h4>Dear ${displayName},</h4>
    <h4>Thank you for ordering with us. Please find your invoice below</h4>
    ${emailContent}`,
  };

  return axios
    .post(serverUrl, mailDetails)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

// sendConfirmation

// sendOrdersToSuppliers
