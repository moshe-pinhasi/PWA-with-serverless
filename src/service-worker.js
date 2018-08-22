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
// const workbox = window.workbox;

workbox.core.setCacheNameDetails({ prefix: "cropchat" });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp("https://cropchat-95fa2.firebaseio.com"),
  workbox.strategies.networkFirst(),
  "GET"
);
workbox.routing.registerRoute(
  new RegExp("https://thecatapi.com/api"),
  workbox.strategies.networkFirst(),
  "GET"
);
workbox.routing.registerRoute(
  new RegExp("https://code.getmdl.io"),
  workbox.strategies.networkFirst(),
  "GET"
);

workbox.routing.registerRoute(
  new RegExp("https://25.media.tumblr.com"),
  workbox.strategies.networkFirst(),
  "GET"
);
