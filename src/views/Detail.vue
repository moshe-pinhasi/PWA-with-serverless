<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col">
      <div class="picture">
        <img :src="cat.url" />
      </div>
        <div class="info">
          <span>{{ cat.info }}</span>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="comment">
          <span>{{ cat.comment }}</span>
        </div>
        <div class="actions">
          <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                       to="/post">
            ANSWER
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { find } from "lodash";
import dbService from "@/services/dbService";

export default {
  data() {
    return {
      catToShow: {}
    };
  },
  created() {
    this.loadCat();
  },
  computed: {
    cat() {
      return this.catToShow;
    },
    isOnline() {
      return this.$store.getters.isOnline;
    }
  },
  methods: {
    loadCat() {
      if (this.isOnline) {
        this.catToShow = find(
          this.$root.cat,
          cat => cat[".key"] === this.$route.params.id
        );
      } else {
        this.loadCatsFromCache().then(cats => {
          this.catToShow = find(
            cats,
            cat => cat[".key"] === this.$route.params.id
          );
        });
      }
    },
    loadCatsFromCache() {
      return dbService.readAllData("cats").then(res => res[0]);
    }

    // load from local storage
    // getCat() {
    //   if (navigator.onLine) {
    //     const cat = find(
    //       this.$root.cat,
    //       cat => cat[".key"] === this.$route.params.id
    //     );
    //     return cat;
    //   } else {
    //     const cats = this.loadCatsFromCache();
    //     const cat = find(cats, cat => cat[".key"] === this.$route.params.id);
    //     return cat;
    //   }
    // },
    // loadCatsFromCache() {
    //   return JSON.parse(localStorage.getItem("cats"));
    // }
  }
};
</script>

<style scoped>
.picture > img {
  color: #fff;
  width: 100%;
}
.info {
  text-align: right;
  padding: 5px;
  color: #555;
  font-size: 10px;
}
.comment {
  padding: 10px;
  color: #555;
}
.actions {
  text-align: center;
}
</style>
