<template>
  <WeatherPage class="con" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import WeatherPage from "@/views/WeatherPage.vue";
export default defineComponent({
  name: "App",
  components: {
    WeatherPage,
  },
});
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

:root {
  --color-bg: #1f2937;
  --color-bg-var: #b4b4b4;
  --color-prime: #5f9ea0;
  --color-light: #ffffffbf;
  --color-hot: #ff5959;
  --color-warm: #ff8c4a;
  --color-chilly: #22ceab;
  --color-cold: #6da0ff;
  --con-w: 90%;
  --trans: all 400ms ease;
}

.v-enter-active {
  transition: opacity 2.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #1f2937;
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
}

h1,
h2,
h3,
h4,
h5,
h6,
span {
  font-weight: 600;
}

.text-light {
  color: var(--color-light);
}

.text {
  &-hot {
    color: var(--color-hot);
  }
  &-warm {
    color: var(--color-warm);
  }
  &-chilly {
    color: var(--color-chilly);
  }
  &-cold {
    color: var(--color-cold);
  }
}

::-webkit-scrollbar {
  display: none;
}

.con {
  width: var(--con-w);
  margin: 0 auto;
  padding: 5rem 0;
}

.icon {
  display: inline-block;
  overflow: visible;
  vertical-align: -0.4rem;
  height: 1.5rem;
}

@media screen and (max-width: 650px) {
  .con {
    padding: 3rem 0;
  }
}
</style>
