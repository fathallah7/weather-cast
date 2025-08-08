<script setup>
import { RouterView } from 'vue-router'
import SiteNav from './components/SiteNav.vue';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <main class="bg-cyan-800 min-h-screen ">
    <SiteNav />
    <RouterView />
  </main>
</template>

<style scoped>

</style>
