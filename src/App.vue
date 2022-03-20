<template>
  <div class="bg-gray-700 min-h-screen text-white">
    <HeaderNav />
    <router-view />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
  components: {
    HeaderNav,
  },
};
</script>

<style></style>
