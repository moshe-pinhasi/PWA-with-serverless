/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// eslint-disable-next-line
workbox.core.setCacheNameDetails({ prefix: "cropchat" });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line
workbox.precaching.suppressWarnings();
// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// eslint-disable-next-line
workbox.routing.registerRoute(
  new RegExp("https://cropchat-95fa2.firebaseio.com"),
  // eslint-disable-next-line
  workbox.strategies.networkFirst(),
  "GET"
);
// eslint-disable-next-line
workbox.routing.registerRoute(
  new RegExp("https://thecatapi.com/api"),
  // eslint-disable-next-line
  workbox.strategies.networkFirst(),
  "GET"
);

// eslint-disable-next-line
workbox.routing.registerRoute(
  new RegExp("https://code.getmdl.io"),
  // eslint-disable-next-line
  workbox.strategies.networkFirst(),
  "GET"
);

// eslint-disable-next-line
workbox.routing.registerRoute(
  new RegExp("https://25.media.tumblr.com"),
  // eslint-disable-next-line
  workbox.strategies.networkFirst(),
  "GET"
);

self.addEventListener("notificationclick", event => {
  console.log("notification clicked");
  var notification = event.notification;
  // var action = event.action;

  event.waitUntil(
    self.clients.matchAll().then(clis => {
      var client = clis.find(c => {
        return c.visibilityState === "visible";
      });

      if (client !== undefined) {
        client.navigate(notification.data.url);
        client.focus();
      } else {
        self.clients.openWindow(notification.data.url);
      }
      notification.close();
    })
  );
});

self.addEventListener("notificationclose", event => {
  console.log("notification closed");
  var notification = event.notification;
  notification.close();
});

self.addEventListener("push", event => {
  console.log("Push Notification received", event);

  var data = {
    title: "New cat Added!",
    content: "you can see the new cat by clikcing...",
    openUrl: "/"
  };

  // or get the data from server
  // if (event.data) {
  //   data = JSON.parse(event.data.text());
  // }

  var options = {
    body: data.content,
    data: {
      url: data.openUrl
    },
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

  event.waitUntil(self.registration.showNotification(data.title, options));
});
