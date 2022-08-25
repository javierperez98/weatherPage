import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

function formatDate(unix: number): string {
  const date = new Date(unix * 1000);
  const dayText = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const dayNum = date.toLocaleString("en-US", { day: "numeric" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  return [dayText, month, dayNum, year].join(" ");
}

interface OneDay {
  temp: number;
  weather: string;
  humidity: number;
  wind: number;
}

interface Forecast {
  temp: {
    day: number;
    min: number;
    max: number;
    morn: number;
    night: number;
    eve: number;
  };
  humidity: number;
  wind: number;
  weather: string;
  date: number;
}

interface ForecastApi {
  temp: number;
  dt: number;
  weather: Record<string, Record<string, number>>;
  humidity: number;
  wind_speed: number;
}

export interface State {
  apiKey: string;
  dayUrl: string;
  dayUrl2: string;
  fiveUrl: string;
  fiveUrl2: string;
  city: string;
  lat: string;
  lon: string;
  location: string;
  oneDay: Record<string, OneDay>;
  forecast: Array<Forecast>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    apiKey: "&appid=080f42673958d9248cf81c7911a0770a",
    dayUrl: "https://api.openweathermap.org/data/2.5/weather?q=",
    dayUrl2: "&units=imperial",
    fiveUrl: "https://api.openweathermap.org/data/2.5/onecall?",
    fiveUrl2: "&exclude=current,minutely,alerts,hourly&units=imperial",
    city: "",
    lat: "lat=",
    lon: "&lon=",
    location: "",
    oneDay: {},
    forecast: [],
  },
  getters: {
    oneDayUrl(state: State) {
      return state.dayUrl + state.city + state.dayUrl2 + state.apiKey;
    },
    forecastUrl(state: State) {
      return (
        state.fiveUrl + state.lat + state.lon + state.fiveUrl2 + state.apiKey
      );
    },
  },
  mutations: {
    setLat(state: State, value: string) {
      state.lat = "lat=" + value;
    },
    setLon(state: State, value: string) {
      state.lon = "&lon=" + value;
    },
    setCity(state: State, value: string) {
      state.city = value;
    },
    setOneDay(state: State, value: Record<string, OneDay>) {
      state.oneDay = value;
    },
    setForecast(state: State, value: Array<Forecast>) {
      state.forecast = value;
    },
    setLocation(state: State, value: string) {
      state.location = value;
    },
  },
  actions: {
    async oneDayApi({ commit }, url: string) {
      const res = await fetch(url);
      const data = await res.json();
      const day = {
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main,
        humidity: Math.round(data.main.humidity),
        wind: Math.round(data.wind.speed),
      };
      commit("setLat", data.coord.lat);
      commit("setLon", data.coord.lon);
      commit("setLocation", data.name + ", " + data.sys.country);
      return day;
    },
    // eslint-disable-next-line no-empty-pattern
    async forecastApi({}, url: string) {
      const res = await fetch(url);
      const data = await res.json();
      const days = data.daily.map((obj: ForecastApi) => {
        return {
          temp: obj.temp,
          date: formatDate(obj.dt),
          weather: obj.weather[0].main,
          humidity: Math.round(obj.humidity),
          wind: Math.round(obj.wind_speed),
        };
      });
      days.shift();
      return days;
    },
  },
  modules: {},
});

export function useStore() {
  return baseUseStore(key);
}
