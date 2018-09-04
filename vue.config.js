// import config from "./config";

module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production" &&
    process.env.BUILD_FOR == "github-pages"
      ? "/pwa-with-vue-cli3/"
      : "/",
  // baseUrl: config["vue.config"].baseUrl, //process.env.NODE_ENV === "production" ? "/pwa-with-vue-cli3/" : "/",
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"

      // if you using the 'generateSW' you need to cache dynamic file this way:
      // runtimeCaching: [
      //   {
      //     // Match any same-origin request that contains 'api'.
      //     urlPattern: new RegExp("^https://cropchat-95fa2.firebaseio.com"),
      //     // Apply a network-first strategy.
      //     handler: "networkFirst"
      //   },
      //   {
      //     // Match any same-origin request that contains 'api'.
      //     urlPattern: new RegExp("^https://thecatapi.com/api"),
      //     // Apply a network-first strategy.
      //     handler: "networkFirst"
      //   },
      //   {
      //     // Match any same-origin request that contains 'api'.
      //     urlPattern: new RegExp("^https://code.getmdl.io"),
      //     // Apply a network-first strategy.
      //     handler: "networkFirst"
      //   }
      // ]
    }
  }
};
