<template>
  <Header />
  <div>
    <router-view></router-view>
  </div>
  <Footer />
  <GoToTop></GoToTop>
</template>

<script lang="ts" setup>
import { GoToTop } from "@go-ui/vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>
