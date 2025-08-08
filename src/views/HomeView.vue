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
    query : {
      cityName: city.name,
      lat: city.lat,
      lng: city.lng,
    },
  });
};

</script>


<template>
  <main class="px-16 md:px-44 lg:px-72 text-white">
    <div class="pt-4 mt-2 relative">
      <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a city or state"
        class="px-1 py-2 w-full border-b focus:outline-0 bg-transparent" />

      <ul v-if="results.length" class="absolute bg-gray-800 text-white w-full shadow-md py-2 px-1 z-50">
        <li v-for="city in results" @click="previewDetails(city)" class="cursor-pointer py-1 hover:bg-gray-700 px-2">
          {{ city.name }}
        </li>
      </ul>

      <p v-if="serverError" class="text-gray-300 py-2">
      <ul class="absolute bg-gray-800 text-white w-full shadow-md py-2 px-1 ">
        <li class="py-1  px-2">
          No Data
        </li>
      </ul>
      </p>

    </div>
  </main>
</template>
