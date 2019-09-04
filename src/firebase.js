const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const config = {
  apiKey: "AIzaSyA2ILpF9Gb4A2uGVnLNs4SfiKgmCsYTCZM",
  authDomain: "pipedrive-app-a8b8e.firebaseapp.com",
  databaseURL: "https://pipedrive-app-a8b8e.firebaseio.com",
  projectId: "pipedrive-app-a8b8e",
  storageBucket: "pipedrive-app-a8b8e.appspot.com",
  messagingSenderId: "868762261335",

};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage }