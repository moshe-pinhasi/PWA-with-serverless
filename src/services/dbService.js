var request = null;
var dbPromise = null;
//check for support
if ("indexedDB" in window) {
  console.log("This browser support IndexedDB");

  request = indexedDB.open("cats-store", 1);
  request.onupgradeneeded = event => {
    console.log("onupgradeneeded");
    var db = event.target.result;
    if (!db.objectStoreNames.contains("cats")) {
      db.createObjectStore("cats", { autoIncrement: true });
    }
  };

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
        res.push(cursor.value);
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

export default {
  writeData,
  readAllData,
  clearAllData
};
