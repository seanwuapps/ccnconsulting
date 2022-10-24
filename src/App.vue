<script setup lang="ts">
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Features from "./components/Features.vue";
import BgLine from "./components/BgLine.vue";
import content from "./content";
import ContactUs from "./components/ContactUs.vue";
import Footer from "./components/Footer.vue";
console.clear();
console.groupCollapsed("Hey 😎!");
console.log(
  `
%cIf you are looking at this out of force of habits, send an email to %cconsole@ccnconsulting.com.au%c and let's go get a coffee, it's on us.
PS. If you liked our website, check out the UI library we used https://go-ui.com
`,
  "color: #208388",
  "color: #208388; font-weight: bold",
  "color: #208388"
);
console.groupEnd();
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
  <Footer />
  <go-to-top></go-to-top>
</template>

<style lang="scss">
@import "@go-ui/core/src/global/scss/utils";
html {
  overflow-x: hidden;
}
:root {
  --ccn-primary-color: #208388;
  --ccn-primary-color-50: #{rgba(#208388, 0.5)};
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
  @include tablet {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
  }
}
.row {
  width: 100%;
}
</style>
