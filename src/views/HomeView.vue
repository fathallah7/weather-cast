<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";

const searchQuery = ref(""); // input -> v-model
const results = ref([]);    // result from api
const serverError = ref(null)


const apiKey = "0da1f1b489cd4ffdbe4d8458d7660c09";  // Api key from opencagedata

const getSearchResults = async () => {

  serverError.value = (null);
  results.value = []; // reset results

  if (searchQuery.value.trim() === "") {   // if empty search then the result is empty and no error
    results.value = [];
    return;
  }

  try {
    const response = await axios.get(       // Get the data
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchQuery.value)}&key=${apiKey}&limit=5`
    );

    results.value = response.data.results.map((item, index) => ({
      id: index,
      name: item.formatted,
      lat: item.geometry.lat,
      lng: item.geometry.lng,
    }));

  }
  catch (err) {
    serverError.value = true
  }

};

const previewDetails = (city) => {

  router.push({
    name: "WeatherDetails",
    query: {
      cityName: city.name,
      lat: city.lat,
      lng: city.lng,
    },
  });
};

</script>

<template>
  <main class="min-h-screen bg-cyan-800 text-white">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Weather Cast</h1>
        <p class="text-xl md:text-2xl text-cyan-100 max-w-2xl mx-auto">
          Get accurate weather forecasts for any location worldwide
        </p>
      </div>

      <!-- Search Section -->
      <div class="w-full max-w-2xl relative">
        <div class="relative">
          <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a city or state..."
            class="w-full px-6 py-4 rounded-full bg-cyan-700 bg-opacity-50 border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-cyan-200 shadow-lg" />
          <svg class="absolute right-5 top-4 h-6 w-6 text-cyan-300" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Search Results Dropdown -->
        <ul v-if="results.length"
          class="absolute mt-2 w-full bg-cyan-700 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden z-50">
          <li v-for="city in results" @click="previewDetails(city)"
            class="cursor-pointer px-6 py-3 hover:bg-cyan-600 transition-colors duration-200 flex items-center">
            <svg class="h-5 w-5 mr-3 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ city.name }}{{ city.state ? `, ${city.state}` : '' }}{{ city.country ? `, ${city.country}` : ''
              }}</span>
          </li>
        </ul>

        <!-- No Results Message -->
        <div v-if="serverError"
          class="absolute mt-2 w-full bg-cyan-700 bg-opacity-90 rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-3 text-cyan-200 flex items-center">
            <svg class="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>No results found. Try another location.</span>
          </div>
        </div>
      </div>


      <!-- Features Section -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="bg-cyan-700 bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
          <div class="text-cyan-300 mb-4 text-4xl"><i class="fa-regular fa-clock"></i></div>
          <h3 class="text-xl font-semibold mb-2">Real-time Data</h3>
          <p class="text-cyan-100">Get up-to-the-minute weather information for your location.</p>
        </div>
        <div class="bg-cyan-700 bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
          <div class="text-cyan-300 mb-4 text-4xl"><i class="fa-solid fa-mobile-screen"></i></div>
          <h3 class="text-xl font-semibold mb-2">Multi-platform</h3>
          <p class="text-cyan-100">Access your weather data from any device, anywhere.</p>
        </div>
      </div>
    </section>

  </main>
</template>