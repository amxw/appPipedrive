const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const config = {
  apiKey: "AIzaSyCy7F_8OuZMGOM72vuv9z4cSFx0dhXx1o8",
  authDomain: "pipedrive-app-1882c.firebaseapp.com",
  databaseURL: "https://pipedrive-app-1882c.firebaseio.com",
  projectId: "pipedrive-app-1882c",
  storageBucket: "pipedrive-app-1882c.appspot.com",
  messagingSenderId: "492878790530",
  appId: "1:492878790530:web:41a910dc51e30f8165999b"

};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage }