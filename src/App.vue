<template>
  <Header />
  <main>
    <router-view></router-view>
  </main>
  <Footer />
  <GoToTop></GoToTop>
</template>

<script lang="ts" setup>
import { GoToTop } from '@go-ui/vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
}
</style>
