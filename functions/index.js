const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const webpush = require("web-push");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

var serviceAccount = require("./cropchat-95fa2-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cropchat-95fa2.firebaseio.com"
});

webpush.setVapidDetails(
  "mailto:someemail@email.com",
  "BLc-s9wisrfhmLNoVKa3mqvsv7VxNZU5qFYmR3Wy-1noDQLUlaXwISm5xNx3JvHhUFjGL_sYl8DpKbRl6mZdq1M",
  "XK - MitZjyumXV9Nc9uvKzi29cYYHOz7VVi1ywqTj_lE"
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
