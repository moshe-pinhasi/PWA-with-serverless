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

// eslint-disable-next-line
workbox.routing.registerRoute(
  new RegExp(
    "https://us-central1-cropchat-95fa2.cloudfunctions.net/createPost"
  ),
  // eslint-disable-next-line
  workbox.strategies.networkFirst(),
  "POST"
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
    content: "Check it out now",
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

// In order to serve offline content, I added a fetch handler
self.addEventListener("fetch", event => {
  var url = "https://api.thecatapi.com/v1/images/search";

  console.log("Fetch: ", event.request);
  if (event.request.url.indexOf(url) > -1) {
    console.log("check in cache");
    var respo;
    event.respondWith(
      fetch(event.request)
        .then(res => {
          respo = res;
          return res.json();
        })
        .then(data => {
          writeData("cat", data);
          return respo;
        })
        .catch(err => {
          console.log(err);
          caches.match(event.request).then(response => {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return Promise.reject(err);
          });
        })
    );
  }
});

var dbPromise = null;
//check for support
if ("indexedDB" in self) {
  console.log("This browser support IndexedDB");

  dbPromise = indexedDB.open("cats-store", 1, db => {
    if (!db.objectStoreNames.contains("cats")) {
      db.createObjectStore("cats", { keyPath: "id" });
    }
  });

  console.log("IndexedDB is: ", dbPromise);
}

// eslint-disable-next-line
function writeData (st, data) {
  return dbPromise.then(db => {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.put(data);
    return tx.complete;
  });
}

// eslint-disable-next-line
function readAllData (st) {
  return dbPromise.then(db => {
    var tx = db.transaction(st, "readonly");
    var store = tx.objectStore(st);
    return store.getAll();
  });
}

// eslint-disable-next-line
function clearAllData (st) {
  return dbPromise.then(db => {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.clear();
    return tx.complete;
  });
}

// eslint-disable-next-line
function deleteItemFromData (st, id) {
  return dbPromise.then(db => {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.delete(id);
    return tx.complete;
  });
}
