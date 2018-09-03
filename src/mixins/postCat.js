import axios from "axios";

const postCat = {
  methods: {
    postCat(catUrl, title) {
      return axios.post(
        "https://us-central1-cropchat-95fa2.cloudfunctions.net/createPost",
        {
          url: catUrl,
          comment: title,
          info: "Posted by Charles on Tuesday"
        }
      );

      // example how you can post directly to db using the firebase ($firebaseRefs.cat - see in main.js)
      // return this.$root.$firebaseRefs.cat.push({
      //   url: catUrl,
      //   comment: title,
      //   info: "Posted by Charles on Tuesday",
      //   created_at: -1 * new Date().getTime()
      // });
    }
  }
};

export default postCat;
