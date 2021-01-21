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
		.filter((orderItem) => orderItem.item.Supplier === supplier.name)
		.map(
			(orderItem) =>
				`${orderItem.quantity}x%20${orderItem.item.Quantity}${orderItem.item.Units}%20${orderItem.item.Item}`
		);

	const orderString = orderRowsArray.join("%0D%0A");

	const emailBody = `Dear%20${supplier.name}%2C%0D%0A%0D%0AI would like to place the following order for the month of ***%3A%0D%0A%0D%0A${orderString}%0D%0A%0D%0AOur market day this month will be on Friday the ***%0D%0A%0D%0APlease would you deliver before ***%0D%0A%0D%0AMany thanks and kind regards	%2C%2C%0D%0AKate`;

	const mailToLink = `mailto:${supplier.email}?subject=Local%20Healthy%20Ethical%20Food%20Club%20Order&body=${emailBody}`;

	return mailToLink;

	//   let emailRowsArray = [];
	//   const timesTableBody = document.getElementById("timesTableBody");
	//   const tableRowsArray = timesTableBody.children;
	//   for (let i = 0; i < tableRowsArray.length; i++) {
	//     const rowArray = Array.from(tableRowsArray[i].children);
	//     let filteredArray = [];
	//     rowArray.forEach((col) => {
	//       if (col.className !== "num" && col.className !== "delete") {
	//         filteredArray.push(col.innerText);
	//       }
	//     });
	//     emailRowsArray.push(filteredArray.join(","));
	//   }
	//   const emailBody = emailRowsArray.join("%0D%0A");
	//   let emailAddress = e.target[0].value;
	//   window.open(
	//     `mailto:${emailAddress}?subject=${year}/${month}/${day}:%203Style%20Trainer%20Session&body=${emailBody}`,
	//     "_blank"
	//   );
};

// sendOrdersToSuppliers
