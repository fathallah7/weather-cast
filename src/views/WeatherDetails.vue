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
    <main class="relative min-h-screen bg-cyan-800 text-white overflow-hidden">
        <!-- Dynamic Weather Background Effect -->
        <div class="absolute inset-0 bg-[url('/weather-bg.png')] bg-cover opacity-20 pointer-events-none"></div>
        
        <!-- Weather Content -->
        <div v-if="weatherData" class="max-w-2xl mx-auto text-center space-y-8 py-12 px-6 relative z-10">
            <!-- Location Info -->
            <div class="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-xl">
                <h1 class="text-5xl font-extrabold tracking-tight">
                    {{ weatherData.location.name }}, {{ weatherData.location.country }}
                </h1>
                <p class="text-md text-gray-300 mt-2">{{ weatherData.location.localtime }}</p>
            </div>

            <!-- Weather Icon + Temp -->
            <div class="flex flex-col items-center space-y-4">
                <img :src="`https:${weatherData.current.condition.icon}`" alt="Weather Icon" class="w-32 drop-shadow-lg" />
                <p class="text-7xl font-extrabold text-white ">
                    {{ weatherData.current.temp_c }}°C
                </p>
                <p class="text-2xl capitalize text-gray-200">{{ weatherData.current.condition.text }}</p>
            </div>

            <!-- Weather Details Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl text-left text-sm transition-transform hover:scale-[1.02]">
                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-temperature-half text-blue-300 text-lg"></i>
                    <span class="text-gray-200">Feels like:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.feelslike_c }}°C</span>
                </div>

                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-droplet text-cyan-300 text-lg"></i>
                    <span class="text-gray-200">Humidity:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.humidity }}%</span>
                </div>

                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-wind text-gray-300 text-lg"></i>
                    <span class="text-gray-200">Wind:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.wind_kph }} km/h ({{ weatherData.current.wind_dir }})</span>
                </div>

                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-gauge text-purple-300 text-lg"></i>
                    <span class="text-gray-200">Pressure:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.pressure_mb }} hPa</span>
                </div>

                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-eye text-yellow-300 text-lg"></i>
                    <span class="text-gray-200">Visibility:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.vis_km }} km</span>
                </div>

                <div class="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-sun text-orange-300 text-lg"></i>
                    <span class="text-gray-200">UV Index:</span>
                    <span class="ml-auto font-semibold">{{ weatherData.current.uv }}</span>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-400 text-center mt-8 text-lg font-semibold">{{ error }}</p>
    </main>
</template>
