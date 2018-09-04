import axios from "axios";
import firebaseService from "@/services/firebase";
import config from "../../config";
const firebaseConfig = config["firebase"];

const postCat = {
  methods: {
    postCat(catUrl, title) {
      return axios.post(firebaseConfig.functions.createPostURL, {
        url: catUrl,
        comment: title,
        info: "Posted by Charles on Tuesday"
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
