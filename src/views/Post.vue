<template>
  <form>
    <div class="mdl-grid">
      <div v-if="errorMessage"
           class="mdl-cell mdl-cell--8-col">{{errorMessage}}</div>
      <div v-else
           class="mdl-cell mdl-cell--8-col">
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
import config from "../../config";
import postCat from "@/mixins/postCat";

const catApiConfig = config["catApi"];

export default {
  data() {
    return {
      catUrl: null,
      title: "",
      loading: false,
      errorMessage: ""
    };
  },
  mixins: [postCat],
  mounted() {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["x-api-key"] = catApiConfig.apiKey;

    this.loading = true;
    axios
      .get(catApiConfig.searchURL)
      .then(res => {
        this.catUrl = res.data[0].url;
        this.loading = false;
      })
      .catch(err => {
        console.error("Post.vue:", err);
        if (this.isOnline)
          this.errorMessage =
            "Couldn't load data, it seems that you are offline";
      });
  },
  methods: {
    post() {
      this.postCat(this.catUrl, this.title)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  computed: {
    isOnline() {
      return this.$store.getters.isOnline;
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
