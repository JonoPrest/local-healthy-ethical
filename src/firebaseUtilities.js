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

    const newUserRefObject = {
      displayName,
      email,
      createdAt,
      ordersPlaced,
      ...additionalData,
    };

    try {
      await userRef.set(newUserRefObject);
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

export const createUserOrder = async (userAuth, cart) => {
  const userRef = firestore.doc(`users/${userAuth.id}`);
  const orderNumber = userAuth.ordersPlaced + 1;

  const date = new Date();

  await userRef.update({ ordersPlaced: orderNumber });
  await userRef.collection("orders").doc(`${orderNumber}`).set({ date: date });

  cart.forEach(async (cartItem, i) => {
    const {
      Category,
      Item,
      Price,
      Quantity,
      Units,
      Supplier,
      Code,
    } = cartItem.product;

    const orderQuantity = cartItem.quantity;

    const orderObject = {
      orderQuantity: orderQuantity,
      category: Category,
      item: Item,
      code: Code,
      price: Price,
      quantity: Quantity,
      units: Units,
      supplier: Supplier,
      dateOrdered: date,
    };
    await userRef
      .collection("orders")
      .doc(`${orderNumber}`)
      .collection("items")
      .doc()
      .set(orderObject);
  });
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
            const orderItemsRef = firestore.collection(
              `users/${user.id}/orders/${order.id}/items`
            );
            orderItemsRef.get().then((itemSnapshot) => {
              itemSnapshot.forEach((item) => everyOrderArray.push(item.data()));
            });
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
