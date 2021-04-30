import axios from "axios";

const serverUrl = "https://local-healthy-ethical-api.herokuapp.com/mail";

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
  const { email, displayName } = userOrder.user;

  const mailDetails = {
    from: "localhealthyethical@gmail.com",
    to: ["localhealthyethical@gmail.com", email],
    subject: `Local Healthy Ethical - Invoice #${userOrder.invoiceNumber} for ${displayName}`,
    html: `
    <h4>Dear ${displayName},</h4>
    <h4>Thank you for ordering with us. Please find your invoice below:</h4>
    ${emailContent}`,
  };

  return axios
    .post(serverUrl, mailDetails)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const sendOrderConfirmation = (currentUser, emailContent) => {
  const { displayName, email } = currentUser;

  const mailDetails = {
    from: "localhealthyethical@gmail.com",
    to: ["localhealthyethical@gmail.com", email],
    subject: `Your Local Healthy Ethical Order`,
    html: `<p>Dear ${displayName},</p>
    <p>Thank you, your order was received!</p>
    <p>This is what you ordered:</p>
    ${emailContent}`,
  };

  return axios
    .post(serverUrl, mailDetails)
    .then((res) => console.log(res))
    .catch((err) => {
      throw err;
    });
};

export const mailToSuppliers = (orderArray, supplier) => {
  const orderRowsArray = orderArray
    .filter((orderItem) => orderItem.itemInfo.item.Supplier === supplier.name)
    .map((orderItem) => {
      const row = `${orderItem.itemInfo.quantity}x ${orderItem.itemInfo.item.Quantity}${orderItem.itemInfo.item.Units} ${orderItem.itemInfo.item.Item}`;

      return row;
    });

  const orderString = orderRowsArray.join("\n");

  const emailBody = `Dear ${supplier.personalName},\n\nWe would like to place the following order:\n\n${orderString}\n\nOur market day this month will be on Friday the ***\n\nKindly let us know if you would be able to deliver by Wednesday next week.\n\nKind regards,\n\[name]\n\nLocal Healthy Ethical`;

  const encodedBody = encodeURIComponent(emailBody);

  const encodedEmailAddress = encodeURI(supplier.email);
  const encodedSubject = encodeURIComponent(
    "Local Healthy Ethical Food Club Order"
  );

  const mailToLink = `mailto:${encodedEmailAddress}?subject=${encodedSubject}&body=${encodedBody}`;

  return mailToLink;
};
