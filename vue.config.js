module.exports = {
  pwa: {
    // workboxPluginMode: "InjectManifest",
    // swSrc: "service-worker.js",
    workboxOptions: {
      runtimeCaching: [
        {
          // Match any same-origin request that contains 'api'.
          urlPattern: new RegExp("^https://cropchat-95fa2.firebaseio.com"),
          // Apply a network-first strategy.
          handler: "networkFirst"
        },
        {
          // Match any same-origin request that contains 'api'.
          urlPattern: new RegExp("^https://thecatapi.com/api"),
          // Apply a network-first strategy.
          handler: "networkFirst"
        },
        {
          // Match any same-origin request that contains 'api'.
          urlPattern: new RegExp("^https://code.getmdl.io"),
          // Apply a network-first strategy.
          handler: "networkFirst"
        }
      ]
    }
  }
};
