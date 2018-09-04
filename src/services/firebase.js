import firebase from "firebase";

import config from "../../config";

const firebaseConfig = config["firebase"];
firebase.initializeApp(firebaseConfig.config);

const storage = firebase.storage();
const database = firebase.database();

export default {
  database,
  storage
};
