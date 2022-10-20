<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Features from "./components/Features.vue";
import BgLine from "./components/BgLine.vue";
import content from "./content";
import ContactUs from "./components/ContactUs.vue";
</script>

<template>
  <Header />
  <Hero />
  <div class="content">
    <BgLine />
    <div class="container section" id="about">
      <h2>About</h2>
      <go-md :content="content.about"></go-md>
    </div>

    <div class="container section" id="services">
      <Features />
    </div>

    <div class="container section" id="contact-us">
      <ContactUs />
    </div>
  </div>

  <go-to-top></go-to-top>
</template>

<style lang="scss">
@import "@go-ui/core/src/global/scss/utils";
:root {
  --ccn-primary-color: #208388;
  --ccn-primary-color-50: #{rgba(#208388, 0.5)};
  --go-color-primary-600: var(--ccn-primary-color);
  --go-heading-font-family: "Cormorant Garamond", serif;
}
.section > h2 {
  text-transform: uppercase;
  margin-bottom: 1em;
  @include tablet {
    text-align: inherit;
  }
}
.section {
  padding: 10rem var(--go-outer-gutter, 0.5rem);
  min-height: 50vh;
}
</style>
