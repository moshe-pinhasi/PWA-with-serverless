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

self.addEventListener("message", event => {
  console.log("message data", event.data);

  if (event.data.sync === "post-requests") {
    // receives form data from postMessage upon submission
    writeData("post-requests", event.data);
  }
});

self.addEventListener("sync", event => {
  console.log("now online");

  if (event.tag === "post-requests") {
    self.registration.showNotification("Sync event fired!");

    event.waitUntil(
      readAllData("post-requests").then(res => {
        if (!res) return;

        for (var dt of res) {
          fetch(dt.url, {
            method: dt.method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              url: dt.data.url,
              comment: dt.data.comment,
              info: dt.data.info
            })
          })
            .then(res => res.json())
            .then(() => {
              deleteItemFromData("post-requests", dt.id);
            })
            .catch(err => {
              console.log("could not add cat from sync", err);
            });
        }
      })
    );
  }
});

const searchRequestHandler = event => {
  //   var respo;
  //   event.respondWith(
  //     fetch(event.request)
  //       .then(res => {
  //         respo = res.clone();
  //         return res.json();
  //       })
  //       .then(data => {
  //         return clearAllData("cat").then(() => {
  //           return writeData("cat", data[0]);
  //         });
  //       })
  //       .then(() => {
  //         return respo;
  //       })
  //       .catch(err => {
  //         return readAllData("cat").then(response => {
  //           if (response) {
  //             return new Response(JSON.stringify(response), {
  //               status: 200,
  //               ok: true,
  //               headers: { "Content-Type": "application/json" }
  //             });
  //           }

  //           return Promise.reject(err);
  //         });
  //       })
  //   );

  const CACHE_DYNAMIC_NAME = "dymanic-cache";
  event.respondWith(
    fetch(event.request)
      .then(res => {
        return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
          cache.put(event.request.url, res.clone());
          return res;
        });
      })
      .catch(err => {
        return caches.match(event.request).then(response => {
          if (response) return response;

          return Promise.reject(err);
        });
      })
  );
};

// In order to serve offline content, I added a fetch handler
self.addEventListener("fetch", event => {
  const searchUrl = "https://api.thecatapi.com/v1/images/search";

  console.log("fetch", event);
  if (event.request.url.indexOf(searchUrl) > -1) {
    searchRequestHandler(event);
  }
});

var request = null;
var dbPromise = null;
//check for support
if ("indexedDB" in self) {
  console.log("This browser support IndexedDB");

  request = indexedDB.open("cats-store");

  dbPromise = new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log("dbPromise open successed");
      resolve(request.result);
    };

    request.onerror = err => {
      console.log("dbPromise had an error", err);
      reject(request.error);
    };
  });
}

function openCursor(store) {
  const res = [];
  return new Promise((resolve, reject) => {
    var req = store.openCursor();

    req.onerror = err => reject(err);

    req.onsuccess = event => {
      var cursor = event.target.result;
      if (cursor) {
        res.push(Object.assign({}, cursor.value, { id: cursor.key }));
        cursor.continue();
      } else {
        resolve(res.length > 0 ? res : null);
      }
    };
  });
}

function getStore(st, permissions, tag) {
  console.log("store requested", tag);
  if (!dbPromise) Promise.reject("This browser is not supported IndexedDB");

  return dbPromise.then(db => {
    var tx = db.transaction([st], permissions);
    return tx.objectStore(st);
  });
}

// eslint-disable-next-line
function writeData (st, data) {
  return getStore(st, "readwrite", "writeData").then(store => {
    store.put(data);
  });
}

// eslint-disable-next-line
function readAllData (st) {
  return getStore(st, "readonly", "readAllData").then(store =>
    openCursor(store)
  );
}

// eslint-disable-next-line
function clearAllData (st) {
  return getStore(st, "readwrite", "clearAllData").then(store => {
    store.clear();
  });
}

// eslint-disable-next-line
function deleteItemFromData (st, id) {
  return getStore(st, "readwrite", "deleteItemFromData").then(store => {
    store.delete(id);
  });
}

/*
var dbPromise = null;
//check for support
if ("indexedDB" in self) {
  console.log("This browser support IndexedDB");

  dbPromise = indexedDB.open("cats-store", 1);
  dbPromise.onupgradeneeded = event => {
    console.log("onupgradeneeded");
    var db = event.target.result;
    if (!db.objectStoreNames.contains("cat")) {
      db.createObjectStore("cat", { autoIncrement: true });
    }
  };
}

function getStore(st, permissions) {
  return new Promise(resolve => {
    var db = dbPromise.result;
    var tx = db.transaction([st], permissions);
    resolve(tx.objectStore(st));
  });
}

// eslint-disable-next-line
function writeData (st, data) {
  return getStore(st, "readwrite").then(store => {
    store.put(data);
  });
}

// eslint-disable-next-line
function readAllData (st) {
  const res = [];
  return new Promise((resolve, reject) => {
    getStore(st, "readonly").then(store => {
      var req = store.openCursor();

      req.onerror = err => reject(err);

      req.onsuccess = event => {
        var cursor = event.target.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res.length > 0 ? res : null);
        }
      };
    });
  });
}

// eslint-disable-next-line
function clearAllData (st) {
  return getStore(st, "readwrite").then(store => {
    store.clear();
  });
}

// eslint-disable-next-line
function deleteItemFromData (st, id) {
  return getStore(st, "readwrite").then(store => {
    store.delete(id);
  });
}
*/
