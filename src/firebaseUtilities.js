// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyCO1WVbvP3MagKchDJPcOx4Qcqng1wcqW0",
  authDomain: "local-healthy-ethical-a6efe.firebaseapp.com",
  databaseURL: "https://local-healthy-ethical-a6efe.firebaseio.com",
  projectId: "local-healthy-ethical-a6efe",
  storageBucket: "local-healthy-ethical-a6efe.appspot.com",
  messagingSenderId: "337270941248",
  appId: "1:337270941248:web:0b408d42066ca284c921a5",
  measurementId: "G-3ZL47G5YHS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userRequestRef = firestore.doc(`user-requests/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const ordersPlaced = 0;
    const userAccepted = false;
    const userRejected = false;
    const administrator = false;

    const newUserObj = {
      displayName,
      email,
      createdAt,
      ordersPlaced,
      userAccepted,
      userRejected,
      administrator,
      ...additionalData,
    };

    const batch = firestore.batch();

    try {
      batch.set(userRef, newUserObj);
      batch.set(userRequestRef, newUserObj);

      await batch.commit();
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const sendForgotPasswordEmail = async (emailAddress) => {
  return auth
    .sendPasswordResetEmail(emailAddress)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const resetUserPassword = async (password) => {
  const user = firebase.auth().currentUser;

  try {
    const res = await user.updatePassword(password);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteUserAccount = async (currentUser) => {
  const user = firebase.auth().currentUser;
  const userProfileDoc = firestore.collection("users").doc(`${currentUser.id}`);

  try {
    await user.delete();
    await userProfileDoc.delete();
    return true;
  } catch (err) {
    throw err;
  }
};

export const getShopSettings = async () => {
  const shopSettingsRef = firestore.doc("shop/shop-settings");

  try {
    const snapShot = await shopSettingsRef.get();
    const shopSettings = snapShot.data();

    return shopSettings;
  } catch (err) {
    alert(
      `There was an error while trying to load the shop settings, please screenshot or copy this error and send it to the Local Healthy Ethical Coordinator. You can then try and refresh. \n\nError:\n${err.message}`
    );
    throw err;
  }
};

export const getShopData = async () => {
  const shopDataRef = firestore.doc("shop/shop-data");

  try {
    const snapShot = await shopDataRef.get();
    const shopData = snapShot.data();

    return shopData;
  } catch (err) {
    alert(
      "There was an error while trying to load the shop data, please check your internet connect and refresh."
    );
    throw err;
  }
};

export const createUserOrder = async (
  currentUser,
  cart,
  orderGroupName,
  marketDayFee
) => {
  const batch = firestore.batch();
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const userOrderNumber = currentUser.ordersPlaced + 1;
  const date = new Date();

  //Get invoice number
  const invoiceNumberRef = firestore.doc("orders/info");
  const invoiceSnapshot = await invoiceNumberRef.get();
  const data = await invoiceSnapshot.data();
  const totalOrders = data.totalOrders;
  const invoiceNumber = totalOrders + 1;

  //add blank returns for invoicing
  const addedJarsAndBags = [
    {
      item: { Item: "Return R10 Jar", Price: "-10.00" },
      quantity: 0,
      total: "0.00",
    },
    {
      item: { Item: "Return R5 Jar", Price: "-5.00" },
      quantity: 0,
      total: "0.00",
    },
    {
      item: { Item: "Market Day Fee", Price: marketDayFee },
      quantity: 1,
      total: `${marketDayFee.toFixed(2)}`,
    },
  ];

  const invoiceCart = [...cart, ...addedJarsAndBags];

  const userOrderObject = {
    date: date,
    cart: cart,
    invoiceNumber: invoiceNumber,
  };

  const orderObject = {
    date: date,
    cart: cart,
    invoiceNumber: invoiceNumber,
    user: {
      ...currentUser,
      ordersPlaced: userOrderNumber,
    },
  };

  const invoiceOrderObject = { ...orderObject, cart: invoiceCart };

  //setting original order and order inside users folder
  const userOrderRef = userRef.collection("orders").doc(`${invoiceNumber}`);
  const orderGroupRef = firestore.collection("orders").doc(orderGroupName);
  const orderRef = orderGroupRef
    .collection("orders-this-month")
    .doc(`${invoiceNumber}`);

  batch.set(userOrderRef, userOrderObject);
  batch.update(userRef, { ordersPlaced: userOrderNumber });
  batch.set(orderGroupRef, { id: orderGroupName, date: date });
  batch.set(orderRef, orderObject);
  batch.update(invoiceNumberRef, { totalOrders: invoiceNumber });

  const invoiceOrderRef = firestore
    .collection("invoices")
    .doc(`${invoiceNumber}`);

  batch.set(invoiceOrderRef, invoiceOrderObject);

  try {
    return await batch.commit();
  } catch (err) {
    throw err;
  }
};

export const setShopArray = async (shopData) => {
  const shopDataRef = firestore.doc("shop/shop-data");

  try {
    await shopDataRef.update({ shopItems: shopData });
  } catch (err) {
    throw err;
  }
};

export const setSupplierInfoArray = async (supplierInfo) => {
  const shopDataRef = firestore.doc("shop/shop-data");

  try {
    await shopDataRef.update({ supplierInfo: supplierInfo });
  } catch (err) {
    throw err;
  }
};

export const updateShopIsLive = async (booleanValue) => {
  const shopSettingsRef = firestore.doc("shop/shop-settings");

  try {
    await shopSettingsRef.update({ shopIsLive: booleanValue });
  } catch (err) {
    throw err;
  }
};

export const updateCurrentOrderGroupName = async (newName) => {
  const shopSettingsRef = firestore.doc("shop/shop-settings");

  try {
    await shopSettingsRef.update({ orderGroupName: newName });
  } catch (err) {
    throw err;
  }
};

export const getUserRequests = async () => {
  try {
    const snapShot = await firestore.collection("user-requests").get();

    let userRequestsArray = [];
    snapShot.forEach((snap) => {
      const data = snap.data();
      userRequestsArray.push({ ...data, id: snap.id });
    });
    return userRequestsArray;
  } catch (err) {
    throw err;
  }
};

export const acceptUserRequest = async (user) => {
  const userRequestRef = firestore.doc(`user-requests/${user.id}`);
  const userRef = firestore.doc(`users/${user.id}`);

  try {
    const batch = firestore.batch();

    batch.update(userRef, { userAccepted: true });
    batch.delete(userRequestRef);

    return await batch.commit();
  } catch (err) {
    throw err;
  }
};

export const getOrderMonths = async () => {
  try {
    const snapShot = await firestore.collection("orders").get();

    let monthsArray = [];
    snapShot.forEach(async (snap) => {
      if (snap.id !== "info") {
        monthsArray.push(snap.data());
      }
    });

    const sortedArray = monthsArray.sort((a, b) =>
      a.date < b.date ? 1 : b.date < a.date ? -1 : 0
    );

    const finalArray = sortedArray.map((month) => month.id);

    return finalArray;
  } catch (err) {
    throw err;
  }
};

export const getOrdersForGivenMonth = async (month) => {
  const monthOrdersRef = firestore.collection(
    `orders/${month}/orders-this-month`
  );

  try {
    const snapShot = await monthOrdersRef.get();

    let ordersArray = [];
    snapShot.forEach((snap) => {
      ordersArray.push(snap.data());
    });
    return ordersArray;
  } catch (err) {
    throw err;
  }
};

export const getInvoice = async (invoiceNumber) => {
  const invoiceRef = firestore.collection("invoices").doc(invoiceNumber);

  try {
    const invoiceSnapshot = await invoiceRef.get();
    const invoice = invoiceSnapshot.data();

    return invoice;
  } catch (err) {
    throw err;
  }
};

export const getInvoicesForGivenMonth = async (monthOrdersArray) => {
  try {
    const invoiceArray = await Promise.all(
      monthOrdersArray.map(
        async (order) => await getInvoice(`${order.invoiceNumber}`)
      )
    );
    return invoiceArray;
  } catch (err) {
    throw err;
  }
};

export const updateInvoice = async (order, invoiceNumber) => {
  const invoiceRef = firestore.collection("invoices").doc(invoiceNumber);

  try {
    await invoiceRef.update(order);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getAllInvoices = async () => {
  const invoicesRef = firestore.collection("invoices");

  try {
    const snapShot = await invoicesRef.get();

    let invoicesArray = [];
    snapShot.forEach((snap) => {
      invoicesArray.push(snap.data());
    });
    return invoicesArray;
  } catch (err) {
    throw err;
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
