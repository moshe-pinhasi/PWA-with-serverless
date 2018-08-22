const postCat = {
  methods: {
    postCat(catUrl, title) {
      return this.$root.$firebaseRefs.cat.push({
        url: catUrl,
        comment: title,
        info: "Posted by Charles on Tuesday",
        created_at: -1 * new Date().getTime()
      });
    }
  }
};

export default postCat;
