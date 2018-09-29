/* eslint-disable no-console */
import config from "../../config";
const webpush = config["webpush"];
const firebase = config["firebase"];

if ("Notification" in window) {
  console.log("Notification is supported!");

  // if you using sw, better to add this "navigator.serviceWorker.ready" before the request to permissions
  Notification.requestPermission(results => {
    console.log("notifications permisstions: ", results);

    if (results === "denied") {
      console.log("notifications permisstions denied!");
      return;
    }

    configurePushSub();
  });
}

// register to listen to incoming push message from server
function configurePushSub() {
  if (!("serviceWorker" in navigator)) return;

  var reg;
  navigator.serviceWorker.ready
    .then(swreg => {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(sub => {
      if (sub !== null) return;

      var vapidPublicKey = webpush.publicKey;
      // create new one. when creating new one need to protect the push messages
      var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
      return reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidPublicKey
      });
    })
    .then(newSub => {
      console.log("newSub", newSub);
      if (!newSub) return;
      return fetch(`${firebase.config.databaseURL}/subscriptions.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newSub)
      });
    })
    .then(res => {
      if (res && res.ok) {
        console.log("subscription added successfully");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// you can show notification by calling to this function:
// eslint-disable-next-line
function displayNotification () {
  console.log("displayNotification");
  if (!("serviceWorker" in navigator)) return;
  console.log("serviceWorker exist");
  var options = {
    body: "You successfully subscribed to our Notification service!",
    dir: "ltr",
    lang: "en-US", // BCP 47,
    vibrate: [100, 50, 200],
    tag: "confirm-notification",
    actions: [
      {
        action: "confirm",
        title: "Okay"
      },
      {
        action: "cancel",
        title: "Cancel"
      }
    ]
  };

  navigator.serviceWorker.ready.then(swreg => {
    swreg.addEventListener("notificationclick", event => {
      var notification = event.notification;
      var action = event.action;
      console.log("notificationclick", notification, action);
    });
    swreg.showNotification("Successfully subscribed!", options);
  });
}
