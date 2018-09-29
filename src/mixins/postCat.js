import axios from "axios";
import firebaseService from "@/services/firebase";
import config from "../../config";
const firebaseConfig = config["firebase"];
const createPostURL = firebaseConfig.functions.createPostURL;

const postCat = {
  methods: {
    postCat(catUrl, title) {
      const cat = {
        url: catUrl,
        comment: title,
        info: "Posted by Charles on Tuesday"
      };

      return axios.post(createPostURL, cat).catch(err => {
        if (!navigator.serviceWorker.controller) throw err;

        navigator.serviceWorker.controller.postMessage({
          sync: "post-requests",
          data: cat,
          url: createPostURL,
          method: "POST"
        });
        return navigator.serviceWorker.ready.then(reg => {
          reg.sync.register("post-requests");
        });
      });

      // example how you can post directly to db using the firebase ($firebaseRefs.cat - see in main.js)
      // return this.$root.$firebaseRefs.cat.push({
      //   url: catUrl,
      //   comment: title,
      //   info: "Posted by Charles on Tuesday",
      //   created_at: -1 * new Date().getTime()
      // });
    },
    uploadImage(blob, imageName) {
      return firebaseService.storage
        .ref()
        .child(`images/${imageName}`)
        .put(blob)
        .then(() =>
          firebaseService.storage
            .ref("images")
            .child(imageName)
            .getDownloadURL()
        );
    }
  }
};

export default postCat;
