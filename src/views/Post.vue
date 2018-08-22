<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <div v-if="loading">Loading...</div>
          <img v-else
               :src="this.catUrl" />
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username"
                 v-model="title"
                 type="text"
                 class="mdl-textfield__input" />
          <label for="username"
                 class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="post"
             class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A CAT
          </a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

import postCat from "@/mixins/postCat";

export default {
  data() {
    return {
      catUrl: null,
      title: "",
      loading: false
    };
  },
  mixins: [postCat],
  mounted() {
    // API key: e66a5fe3-80ac-44a8-b4ac-f06111b49e21
    // user_id :v07egf

    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["x-api-key"] =
      "e66a5fe3-80ac-44a8-b4ac-f06111b49e21";

    this.loading = true;
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then(res => {
        this.catUrl = res.data[0].url;
        this.loading = false;
      })
      .catch(err => console.log(err));
  },
  methods: {
    post() {
      this.postCat(this.catUrl, this.title).then(this.$router.push("/"));
    }
  }
};
</script>

<style lang="scss" scoped>
.waiting {
  padding: 10px;
  color: #555;
}
</style>
