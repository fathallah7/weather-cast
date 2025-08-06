<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

import BaseModal from './BaseModal.vue';

const modalActive = ref(null);

const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

</script>

<template>
    <header class="sticky top-0 shadow-xl">
        <nav class="flex items-center justify-between gap-4 py-5  px-16 md:px-44 lg:px-72  text-white">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun"></i>
                    <p class="text-xl font-semibold">Weather App</p>
                </div>
            </RouterLink>

            <div class="flex items-center gap-2">
                <i class="fa-solid fa-plus text-xl hover:text-cyan-600 transition duration-200 cursor-pointer"></i>
                <i @click="toggleModal" class="fa-solid fa-circle-question text-xl hover:text-cyan-600 transition duration-200 cursor-pointer"></i>
            </div>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>
                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>