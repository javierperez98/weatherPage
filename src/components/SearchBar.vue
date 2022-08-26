<template>
  <div class="search-bar">
    <input
      v-model="city"
      type="text"
      class="search-input"
      placeholder="Enter City"
    />
    <button class="search-btn">
      <img
        @click="search"
        class="search-icon"
        src="@/assets/fa-search-location.svg"
      />
    </button>
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
    async search() {
      if (this.city) {
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
  &-bar {
    display: flex;
    flex-direction: row;
  }
  &-input {
    background-color: var(--color-bg-var);
    border-radius: 1rem 0 0 1rem;
    text-transform: capitalize;
    color: var(--color-bg);
    font-size: 1.5rem;
    font-weight: 600;
    padding: 1rem;
    width: 500px;
  }
  &-btn {
    border-left: 0.25rem solid var(--color-bg);
    background-color: var(--color-bg-var);
    border-radius: 0 1rem 1rem 0;
    cursor: pointer;
    padding: 0 0.5rem;
  }
  &-icon {
    vertical-align: -0.5rem;
    height: 2rem;
  }
}
@media screen and (max-width: 650px) {
  .search {
    &-input {
      width: 100%;
    }
  }
}
</style>
