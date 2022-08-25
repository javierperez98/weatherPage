<template>
  <Transition appear>
    <div>
      <h1 class="text-light mb">Weather Forecast</h1>
      <SearchBar />
      <WeatherCard />
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherCard from "@/components/WeatherCard.vue";
import SearchBar from "@/components/SearchBar.vue";

export default defineComponent({
  name: "WeatherPage",
  components: {
    WeatherCard,
    SearchBar,
  },
});
</script>

<style lang="scss">
.mb {
  margin-bottom: 1rem;
}
</style>
