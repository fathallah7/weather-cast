import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WeatherDetails from "../views/WeatherDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/weather",
      name: "WeatherDetails",
      component: WeatherDetails,
      query: (route) => ({
        name: route.query.name,
        lat: route.query.lat,
        lng: route.query.lng,
      }),
    },
  ],
});

export default router;
