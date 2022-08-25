<template>
  <Transition appear>
    <div class="weather-con" v-if="oneDay.temp">
      <div class="weather-card text-light">
        <h1 :class="setColor(oneDay.temp)">{{ oneDay.temp }} &deg;F</h1>
        <h2>{{ location }}</h2>
        <h3>Today</h3>
        <h4>{{ oneDay.weather }}</h4>
        <h4>
          {{ oneDay.humidity }}
          <img class="icon" src="@/assets/wi-humidity.svg" />
        </h4>
        <h4>
          {{ oneDay.wind }} mph
          <img class="icon" src="@/assets/wi-windy.svg" />
        </h4>
      </div>
      <div
        v-for="(info, index) in forecast"
        :key="index"
        class="weather-card text-light"
      >
        <h2>{{ info.date }}</h2>
        <h4>{{ info.weather }}</h4>
        <h4>
          {{ info.humidity }}
          <img class="icon" src="@/assets/wi-humidity.svg" />
        </h4>
        <h4>
          {{ info.wind }} mph
          <img class="icon" src="@/assets/wi-windy.svg" />
        </h4>
        <div class="temps">
          <h4 v-for="(temp, key) in info.temp" :key="key">
            <span class="caps"> {{ key }}: </span>
            <span :class="'temp ' + setColor(temp)"
              >{{ Math.round(temp) }} &deg;F</span
            >
          </h4>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherCard",
  setup() {
    useStore();
  },
  methods: {
    setColor(temp: number): string {
      if (temp > 89) {
        return "text-hot";
      } else if (temp > 69) {
        return "text-warm";
      } else if (temp > 59) {
        return "text-chilly";
      } else {
        return "text-cold";
      }
    },
  },
  computed: {
    oneDay() {
      return this.$store.state.oneDay;
    },
    location() {
      return this.$store.state.location;
    },
    forecast() {
      return this.$store.state.forecast;
    },
  },
});
</script>

<style lang="scss">
.caps {
  text-transform: capitalize;
}
.temps {
  display: grid;
  margin-top: 0.75rem;
  grid-template-columns: repeat(3, 1fr);
}
.weather {
  &-con {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-weight: 500;
    gap: 1.5rem;
  }
  &-card {
    padding: 2rem 1.5rem;
    border-radius: 2rem;
    transition: var(--trans);
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    text-shadow: 3px 6px rgba(rgb(0, 0, 0), 0.25);
  }
}
@mixin temps($num) {
  .temps {
    grid-template-columns: repeat($num, 1fr);
  }
}
@mixin row($num) {
  .weather {
    &-con {
      grid-template-columns: repeat($num, 1fr);
    }
  }
}
@media screen and (max-width: 2000px) {
  @include temps(2);
}
@media screen and (max-width: 1600px) {
  @include row(4);
}
@media screen and (max-width: 1300px) {
  @include row(3);
  @include temps(3);
}
@media screen and (max-width: 1200px) {
  @include temps(2);
}
@media screen and (max-width: 950px) {
  @include row(2);
  @include temps(3);
}
@media screen and (max-width: 800px) {
  @include temps(2);
}
@media screen and (max-width: 650px) {
  @include row(1);
  @include temps(4);
}
@media screen and (max-width: 500px) {
  @include temps(3);
}
@media screen and (max-width: 400px) {
  @include temps(2);
}
</style>
