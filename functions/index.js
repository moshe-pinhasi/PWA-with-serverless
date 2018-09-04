const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const webpush = require("web-push");

import config from "../config";

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const firebase = config["firebase"];
// var serviceAccount = require("./cropchat-95fa2-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebase.serviceAccount),
  databaseURL: firebase.config.databaseURL
});

const webpushConfig = config["webpush"];
webpush.setVapidDetails(
  webpushConfig.MediaList,
  webpushConfig.publicKey,
  webpushConfig.privateKey
);

exports.createPost = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { url, comment, info } = request.body;
    admin
      .database()
      .ref("cat")
      .push({
        url,
        comment,
        info,
        created_at: -1 * new Date().getTime()
      })
      .then(() => {
        return admin
          .database()
          .ref("subscriptions")
          .once("value")
          .then(subscriptions => {
            subscriptions.forEach(sub => {
              var pushConfig = {
                endpoint: sub.val().endpoint,
                keys: {
                  auth: sub.val().keys.auth,
                  p256dh: sub.val().keys.p256dh
                }
              };

              webpush
                .sendNotification(
                  pushConfig,
                  JSON.stringify({
                    message: "New Post",
                    content: "New Post added!"
                  })
                )
                .catch(err => {
                  console.log(err);
                });
            });
          });
      })
      .then(() => {
        response.status(200).json({ message: "post added succefully!" });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  });
});
