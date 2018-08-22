import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDeniIsipzTaiV31RVALn0I77mlNYGYWXE",
  authDomain: "cropchat-95fa2.firebaseapp.com",
  databaseURL: "https://cropchat-95fa2.firebaseio.com",
  projectId: "cropchat-95fa2",
  storageBucket: "cropchat-95fa2.appspot.com",
  messagingSenderId: "238121609237"
};

firebase.initializeApp(config);

const storage = firebase.storage();
const database = firebase.database();

export default {
  database,
  storage
};
