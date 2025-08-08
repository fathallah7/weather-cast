<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const weatherData = ref(null);
const error = ref(null); 

const fetchWeatherData = async () => {

    if (!route.query.lat || !route.query.lng) return;

    try {
        // Fetch weather data using the provided latitude and longitude
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=8520f71db5154818a4b74456250808&q=${route.query.lat},${route.query.lng}`);
        weatherData.value = response.data;
    } catch (error) {
        error.value = "Failed to fetch weather data";
        weatherData.value = null;
        console.error("Error fetching weather data:", error);
    }
};
onMounted(fetchWeatherData);

</script>


<template>

    <main class="mt-10 p-6 text-white bg-gradient-to-b from-cyan-800 to-cyan-900  min-h-screen">
        <div v-if="weatherData" class="max-w-xl mx-auto text-center space-y-6">

            <!-- Location Info -->
            <div>
                <h1 class="text-4xl font-bold tracking-wide">
                    {{ weatherData.location.name }}, {{ weatherData.location.country }}
                </h1>
                <p class="text-sm text-gray-300 mt-1">{{ weatherData.location.localtime }}</p>
            </div>

            <!-- Weather Icon + Temp -->
            <div>
                <img :src="`https:${weatherData.current.condition.icon}`" alt="Weather Icon" class="mx-auto w-24" />
                <p class="text-6xl font-extrabold">{{ weatherData.current.temp_c }}°C</p>
                <p class="text-xl capitalize text-gray-200">{{ weatherData.current.condition.text }}</p>
            </div>

            <!-- Weather Details Grid -->
            <div class="grid grid-cols-2 gap-4 bg-opacity-10 p-6 rounded-xl shadow-lg text-left text-sm">

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-temperature-half text-blue-200"></i>
                    <span class="text-gray-300">Feels like:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.feelslike_c }}°C</span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-droplet text-cyan-300"></i>
                    <span class="text-gray-300">Humidity:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.humidity }}%</span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-wind text-gray-300"></i>
                    <span class="text-gray-300">Wind:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.wind_kph }} km/h ({{
                        weatherData.current.wind_dir }})</span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-gauge text-purple-300"></i>
                    <span class="text-gray-300">Pressure:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.pressure_mb }} hPa</span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-eye text-yellow-300"></i>
                    <span class="text-gray-300">Visibility:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.vis_km }} km</span>
                </div>

                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-sun text-orange-300"></i>
                    <span class="text-gray-300">UV Index:</span>
                    <span class="ml-auto font-bold">{{ weatherData.current.uv }}</span>
                </div>
            </div>
        </div>

        <p v-if="error" class="text-red-400 text-center mt-6 text-lg font-semibold">{{ error }}</p>
    </main>
</template>
