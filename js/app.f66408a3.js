(function(e){function t(t){for(var a,o,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)o=s[u],r[o]&&d.push(r[o][0]),r[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(a=!1)}a&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},o={app:0},r={app:0},i=[];function s(e){return c.p+"js/"+({detail:"detail",post:"post"}[e]||e)+"."+{detail:"c4bfbfec",post:"66e891e2"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={detail:1,post:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var a="css/"+({detail:"detail",post:"post"}[e]||e)+"."+{detail:"e0da920f",post:"9e4988ca"}[e]+".css",o=c.p+a,r=document.getElementsByTagName("link"),i=0;i<r.length;i++){var s=r[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===o))return t()}var u=document.getElementsByTagName("style");for(i=0;i<u.length;i++){s=u[i],l=s.getAttribute("data-href");if(l===a||l===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||o,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.request=a,n(r)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)}).then(function(){o[e]=0}));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise(function(t,n){a=r[e]=[t,n]});t.push(a[2]=i);var l,u=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e),l=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");i.type=a,i.request=o,n[1](i)}r[e]=void 0}};var f=setTimeout(function(){l({type:"timeout",target:d})},12e4);d.onerror=d.onload=l,u.appendChild(d)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/pwa-with-vue-cli3/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2856:function(e,t,n){},"41ff":function(e,t,n){"use strict";var a=n("a5b8"),o=n.n(a);o.a},"55c9":function(e,t,n){"use strict";var a=null,o=null;function r(e){var t=[];return new Promise(function(n,a){var o=e.openCursor();o.onerror=function(e){return a(e)},o.onsuccess=function(e){var a=e.target.result;a?(t.push(a.value),a.continue()):n(t.length>0?t:null)}})}function i(e,t){return o||Promise.reject("This browser is not supported IndexedDB"),o.then(function(n){var a=n.transaction([e],t);return a.objectStore(e)})}function s(e,t){return i(e,"readwrite").then(function(e){e.put(t)})}function c(e){return i(e,"readonly").then(function(e){return r(e)})}function l(e){return i(e,"readwrite").then(function(e){e.clear()})}"indexedDB"in window&&(console.log("This browser support IndexedDB"),a=indexedDB.open("cats-store",5),a.onupgradeneeded=function(e){console.log("onupgradeneeded");var t=e.target.result;t.objectStoreNames.contains("cats")||t.createObjectStore("cats",{autoIncrement:!0}),t.objectStoreNames.contains("post-requests")||t.createObjectStore("post-requests",{autoIncrement:!0})},o=new Promise(function(e,t){a.onsuccess=function(){console.log("dbPromise open successed"),e(a.result)},a.onerror=function(e){console.log("dbPromise had an error",e),t(a.error)}})),t["a"]={writeData:s,readAllData:c,clearAllData:l}},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.isOnline?e._e():n("div",{staticClass:"offline"},[e._v("\n    offline mode\n  ")]),n("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header"},[e._m(0),n("div",{staticClass:"mdl-layout__drawer"},[n("span",{staticClass:"mdl-layout-title"},[e._v("CropChat")]),n("nav",{staticClass:"mdl-navigation"},[n("router-link",{staticClass:"mdl-navigation__link",attrs:{to:"/"},nativeOn:{click:function(t){return e.hideMenu(t)}}},[e._v("Home")]),n("router-link",{staticClass:"mdl-navigation__link",attrs:{to:"/post"},nativeOn:{click:function(t){return e.hideMenu(t)}}},[e._v("Post a picture")])],1)]),n("main",{staticClass:"mdl-layout__content"},[n("div",{staticClass:"page-content"},[n("router-view")],1)])])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"mdl-layout__header"},[n("div",{staticClass:"mdl-layout__header-row"},[n("span",{staticClass:"mdl-layout-title"},[e._v("CropChat")])])])}];n("70a1");var i={methods:{hideMenu:function(){document.getElementsByClassName("mdl-layout__drawer")[0].classList.remove("is-visible"),document.getElementsByClassName("mdl-layout__obfuscator")[0].classList.remove("is-visible")}},computed:{isOnline:function(){return this.$store.getters.isOnline}}},s=i,c=(n("5c0b"),n("2877")),l=Object(c["a"])(s,o,r,!1,null,null,null);l.options.__file="App.vue";var u=l.exports,d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"mdl-grid"},[n("div",{staticClass:"mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"}),n("div",{staticClass:"mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"},e._l(e.cats,function(t){return n("div",{key:t.created_at,staticClass:"image-card",on:{click:function(n){e.displayDetails(t[".key"])}}},[n("div",{staticClass:"image-card__picture"},[n("img",{attrs:{src:t.url}})]),n("div",{staticClass:"image-card__comment mdl-card__actions"},[n("span",[e._v(e._s(t.comment))])])])}))]),n("router-link",{staticClass:"add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored",attrs:{to:"/post"}},[n("i",{staticClass:"material-icons"},[e._v("add")])]),n("router-link",{staticClass:"take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored",attrs:{to:"/camera"}},[n("i",{staticClass:"material-icons"},[e._v("camera_alt")])])],1)},p=[],h=(n("ac6a"),n("55c9")),m={data:function(){return{catsToShow:[]}},created:function(){this.getCats()},computed:{cats:function(){return this.catsToShow},isOnline:function(){return this.$store.getters.isOnline}},methods:{displayDetails:function(e){this.$router.push({name:"detail",params:{id:e}})},getCats:function(){var e=this;this.isOnline?(this.catsToShow=this.$root.cat,this.saveCatsToCache()):h["a"].readAllData("cats").then(function(t){t&&(e.catsToShow=t[0])})},saveCatsToCache:function(){var e=this;h["a"].clearAllData("cats").then(function(){e.$root.$firebaseRefs.cat.orderByChild("created_at").once("value",function(e){var t=[];e.forEach(function(e){var n=e.val();n[".key"]=e.key,t.push(n)}),h["a"].writeData("cats",t)})})}}},v=m,g=(n("41ff"),Object(c["a"])(v,f,p,!1,null,"03357386",null));g.options.__file="Home.vue";var b=g.exports;a["a"].use(d["a"]);var w=new d["a"]({base:"/pwa-with-vue-cli3/",routes:[{path:"/",name:"home",component:b},{path:"/detail/:id",name:"detail",component:function(){return n.e("detail").then(n.bind(null,"c84b"))}},{path:"/post",name:"post",component:function(){return n.e("post").then(n.bind(null,"37d3"))}},{path:"/camera",name:"camera",component:function(){return n.e("post").then(n.bind(null,"6ec0"))}}]}),y=n("2f62");a["a"].use(y["a"]);var _=new y["a"].Store({state:{online:navigator.onLine},mutations:{setOnline:function(e,t){e.online=t}},actions:{},getters:{isOnline:function(e){return e.online}}});function C(e){var t=e.type;_.commit("setOnline","online"===t)}window.addEventListener("online",C),window.addEventListener("offline",C);var k=_,j=n("5f30"),A=n.n(j),B=n("a8d7"),S=n("9483");Object(S["a"])("".concat("/pwa-with-vue-cli3/","service-worker.js"),{ready:function(e){return console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB"),e.sync.register("post-requests")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("34ef"),n("a481"),n("14b9");var K=n("ace7"),L=K["a"]["webpush"],O=K["a"]["firebase"];function E(){var e;"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){return e=t,t.pushManager.getSubscription()}).then(function(t){if(null===t){var n=L.publicKey,a=D(n);return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:a})}}).then(function(e){if(console.log("newSub",e),e)return fetch("".concat(O.config.databaseURL,"/subscriptions.json"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)})}).then(function(e){e&&e.ok&&console.log("subscription added successfully")}).catch(function(e){console.log(e)})}function D(e){for(var t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),a=window.atob(n),o=new Uint8Array(a.length),r=0;r<a.length;++r)o[r]=a.charCodeAt(r);return o}"Notification"in window&&(console.log("Notification is supported!"),Notification.requestPermission(function(e){console.log("notifications permisstions: ",e),"denied"!==e?E():console.log("notifications permisstions denied!")})),a["a"].use(A.a),a["a"].config.productionTip=!1,new a["a"]({firebase:{cat:B["a"].database.ref("cat").orderByChild("created_at")},router:w,store:k,render:function(e){return e(u)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var a=n("2856"),o=n.n(a);o.a},"61ee":function(e){e.exports={"vue.config":{baseUrl:"/"},manifest:{start_url:"/pwa-with-vue-cli3"},firebase:{config:{apiKey:"AIzaSyDeniIsipzTaiV31RVALn0I77mlNYGYWXE",authDomain:"cropchat-95fa2.firebaseapp.com",databaseURL:"https://cropchat-95fa2.firebaseio.com",projectId:"cropchat-95fa2",storageBucket:"cropchat-95fa2.appspot.com",messagingSenderId:"238121609237"},functions:{createPostURL:"https://us-central1-cropchat-95fa2.cloudfunctions.net/createPost"},serviceAccount:{type:"service_account",project_id:"cropchat-95fa2",private_key_id:"02932fa553e7a52688ab2b548b004d7d53ec8db0",private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsX9E4kplk3WvB\negGuH3SXgGz1Tn6ONQg9R9TOUTC7swtJe5sSRG3U6JQDaJd4LVrigNk0KAbPCjRy\ndhzOEFdlQLGq+3DRz/e9924E9es8npnpiKG36GSh+Mxf23g2d28t60XRnoJu3sFt\nffdTR0TB1vYPKfc88sXcch0ID00FklKxHG4tKcO/d7uVaaNHdLfJtsktT0P4cpNs\nWJJoJob6sYdjYeDJwn7BS5Mnqv38UCt193RlDFd/DF8dVP+dlNClUO9eJ5DMfrQy\nPRxrRzrGQ10kzzq0vSfRH7dFKnLKetceVbY2nglLFmnMnIMnjiDAYSg7gHVWVRVR\naCJBKNsLAgMBAAECggEAOAOA+PnGh/zd5cbQYfVNzWeJwKMrw+lezo8Xi53dkLkL\nW2sjxqle6XdUldD4m7BdXspRCr5RDBl8Vo+kJ6AuzjPaKD5B+KQ0lNIhOdJyCUZe\nrIFeT+VgQjQXsbSfWU+xXMId85KnPwD66SosYy7/HGBOoDnaYj9f5ZVdcr+KH1tX\nAeChRzjthcv4s9dsGqzosnMNl9zJS/Crs3sKCaodWqSMOq3shP7skYaUGauayxaL\nCYDdxirhnqgK+7lr5e72/6O8syeT3oRZ1gYmgJhBhu/k4KtdPrn77FRPj1S+4Klx\nQfirmhi3Vw3s22jXiZqsuFlWGLFt2svBTmx/0hl1fQKBgQDb29NAaJXGLIhdxPV/\nFyLtLjMfnbYX4EjLXPM3VQ6BLXaIrCMc8QR5v5PwIpj9EoB+qvzihqKFzEFbsFbD\n2oGhTk71Dmdqd2wdk1DcvcdlExX2xBdL5/pb+hLpdyVvr+y0aVQAXSeozHwMdzcG\n7dIbdh73Tp+PFen/g0quOLexZQKBgQDItbxZBr5tRi0zg/bQSelZw6wyITaTe2/f\ncE3qQeH+wqvgnn4bIuYjV3i8l0nPc5z1OS+slaNJct7maRNSh/PXdHMhjfkB80sL\nrKULIc8fSFsZWqObU553vTPcVg4GclU69DZxy/inEjb0OeDnKa2dq78G/ZS/U2K/\nX67GdUZLrwKBgARQbfbHlpjK6uocIU0bIR5SV8J5D8esKQGEk2k0jBJQ2BCagB3j\nRNk2vyppI2Nj542UwV2YkrvZZDbuYOV69iw6IyZ/39ug+EgkSePq/WyoUTgEZQii\nRrFjWNen9N4aL6TipDlVmp+fU5fTBwtlw0eyq6ziqBLgtTTEWMTObBxZAoGBAIbf\n2VnZ9k1oQyfDHjCJ+o2fuC9Xsl0ZLexwg2tQKpYQK4AeAZAqu4w0U6Yn5CnL/0Wq\n0Cahx8CruK4NHjbvtSSr1FJQHWz6GQwXUDFS3uSestku15KhdnPwaNE/4tziJ/Qd\n+BgwgT+ENfmYi1HL6Cd0KkKAVVzcpBcGLWSfmkVxAoGARKWCm9z04M0SFBEbY5ZG\nmCcrOfyuVuL+mfNI2xRZN0/t/brqJovWY4FyY6BL3Vu8bhGVdVc4QR2KlHLOIgcd\nQWXq5vVkiAtzhNlzh/tYoImh8TfLPVcGaKwBw0DI7zVGKneWIk1LZs941YMbW7h6\nBke8Ic7r9FFI6ufIuqEFpW4=\n-----END PRIVATE KEY-----\n",client_email:"firebase-adminsdk-s5jux@cropchat-95fa2.iam.gserviceaccount.com",client_id:"118043032162227097486",auth_uri:"https://accounts.google.com/o/oauth2/auth",token_uri:"https://oauth2.googleapis.com/token",auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",client_x509_cert_url:"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s5jux%40cropchat-95fa2.iam.gserviceaccount.com"}},catApi:{user_id:"v07egf",apiKey:"e66a5fe3-80ac-44a8-b4ac-f06111b49e21",searchURL:"https://api.thecatapi.com/v1/images/search"},webpush:{mail:"mailto:someemail@email.com",publicKey:"BLc-s9wisrfhmLNoVKa3mqvsv7VxNZU5qFYmR3Wy-1noDQLUlaXwISm5xNx3JvHhUFjGL_sYl8DpKbRl6mZdq1M",privateKey:"XK - MitZjyumXV9Nc9uvKzi29cYYHOz7VVi1ywqTj_lE"},notifications:{openUrl:"https://moshe-pinhasi.github.io/pwa-with-vue-cli3"}}},a5b8:function(e,t,n){},a8d7:function(e,t,n){"use strict";n("cadf"),n("551c"),n("097d");var a=n("8aa5"),o=n.n(a),r=n("ace7"),i=r["a"]["firebase"];o.a.initializeApp(i.config);var s=o.a.storage(),c=o.a.database();t["a"]={database:c,storage:s}},ace7:function(e,t,n){"use strict";var a;n("cadf"),n("551c"),n("097d");console.log("config file env is: ","production"),a=n("61ee"),t["a"]=a}});
//# sourceMappingURL=app.f66408a3.js.map