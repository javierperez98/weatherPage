<template>
  <div class="search-box">
    <input
      v-model="city"
      @keydown="search"
      type="text"
      class="search-bar"
      placeholder="Enter City"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "SearchBar",
  data() {
    return {
      city: "",
    };
  },
  setup() {
    useStore();
  },
  methods: {
    async search(e: KeyboardEvent) {
      if (e.key == "Enter") {
        const city = this.city.trim().replace(/\s+/g, "+").toLowerCase();
        this.$store.commit("setCity", city);
        const oneDay = await this.$store.dispatch(
          "oneDayApi",
          this.$store.getters.oneDayUrl
        );
        const forecast = await this.$store.dispatch(
          "forecastApi",
          this.$store.getters.forecastUrl
        );
        Promise.all([oneDay, forecast]).then(() => {
          this.$store.commit("setOneDay", oneDay);
          this.$store.commit("setForecast", forecast);
        });
      }
    },
  },
});
</script>

<style lang="scss">
.search {
  &-box,
  &-bar {
    display: block;
    padding: 0.75rem;
    color: var(--color-bg);
    font-size: 1.5rem;
    background-color: var(--color-bg-var);
    border-radius: 1rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  &-box {
    width: 600px;
  }
  &-bar {
    width: 100%;
  }
}
@media screen and (max-width: 650px) {
  .search {
    &-box,
    &-bar {
      width: 100%;
    }
  }
}
</style>
