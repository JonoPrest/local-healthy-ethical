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

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const ordersPlaced = 0;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ordersPlaced,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getUserRef = (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  return userRef;
};

export const createUserOrder = async (currentUser, cart) => {
  const batch = firestore.batch();
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const userOrderNumber = currentUser.ordersPlaced + 1;
  const date = new Date();

  //create date for categorising orders by month
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateStr = year + "-" + month;

  //Get invoice number
  const invoiceNumberRef = firestore.doc("orders/info");
  const invoiceSnapshot = await invoiceNumberRef.get();
  const data = await invoiceSnapshot.data();
  const totalOrders = data.totalOrders;
  const invoiceNumber = totalOrders + 1;

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

  //setting original order and order inside users folder
  const userOrderRef = userRef.collection("orders").doc(`${invoiceNumber}`);
  const dateRef = firestore.collection("orders").doc(dateStr);
  const orderRef = dateRef
    .collection("orders-this-month")
    .doc(`${invoiceNumber}`);

  batch.set(userOrderRef, userOrderObject);
  batch.update(userRef, { ordersPlaced: userOrderNumber });
  batch.set(dateRef, { month: month, year: year });
  batch.set(orderRef, orderObject);
  batch.update(invoiceNumberRef, { totalOrders: invoiceNumber });

  const invoiceOrderRef = firestore
    .collection("invoices")
    .doc(`${invoiceNumber}`);

  batch.set(invoiceOrderRef, orderObject);

  return await batch.commit();
};

export const getOrderMonths = async () => {
  const snapShot = await firestore.collection("orders").get();

  let monthsArray = [];
  snapShot.forEach((snap) =>
    snap.id === "info" ? null : monthsArray.push(snap.id)
  );
  return monthsArray;
};

export const getOrdersForGivenMonth = async (month) => {
  const monthOrdersRef = firestore.collection(
    `orders/${month}/orders-this-month`
  );

  const snapShot = await monthOrdersRef.get();

  let ordersArray = [];
  snapShot.forEach((snap) => {
    ordersArray.push(snap.data());
  });
  return ordersArray;
};

export const getInvoice = async (invoiceNumber) => {
  const invoiceRef = firestore.collection("invoices").doc(invoiceNumber);

  const invoiceSnapshot = await invoiceRef.get();
  const invoice = invoiceSnapshot.data();

  return invoice;
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

export const getFirebaseUserInfo = async () => {
  let everyOrderArray = [];
  await firestore
    .collection("users")
    .get()
    .then((userSnapshot) => {
      userSnapshot.forEach((user) => {
        const userOrdersRef = firestore.collection(`users/${user.id}/orders`);
        userOrdersRef.get().then((orderSnapshot) =>
          orderSnapshot.forEach((order) => {
            const orderData = order.data();
            const { id, displayName, email } = user;
            everyOrderArray.push(order.data());
          })
        );
      });
    });
  return everyOrderArray;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
