<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import Features from '@/components/Features.vue';
import BgLine from '@/components/BgLine.vue';
import content from '../content';
import ContactUs from '@/components/ContactUs.vue';
import LatestJobs from '@/components/jobs/LatestJobs.vue';

console.clear();
console.groupCollapsed('Hey 😎!');
console.log(
  `
%cIf you are looking at this out of force of habits, send an email to %cconsole@ccnconsulting.com.au%c and let's go get a coffee, it's on us.
PS. If you liked our website, check out the UI library we used https://go-ui.com
`,
  'color: #208388',
  'color: #208388; font-weight: bold',
  'color: #208388'
);
console.groupEnd();
</script>

<template>
  <div class="home">
    <Hero />
    <div id="main-content">
      <!-- <BgLine /> -->
      <div class="container section" id="about">
        <h2>About</h2>
        <go-md :content="content.about"></go-md>
      </div>

      <div class="container section" id="services">
        <Features />
      </div>

      <div class="container section" id="latest-jobs">
        <LatestJobs />
      </div>

      <div class="container section" id="contact-us">
        <ContactUs />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html {
  overflow-x: hidden;
}
.section > h2 {
  margin-bottom: 1em;
}
.section {
  width: 100%;
  padding: 10rem var(--go-outer-gutter, 0.5rem);
  @include tablet {
    padding: 8rem 0;
  }
}
.home {
  p {
    font-size: var(--go-size-1);
  }
}
#main-content {
  position: relative;
  margin-top: 100vh;
  background: linear-gradient(to bottom, transparent 0%, var(--go-color-bg) 10%);
  backdrop-filter: blur(10px);

}
</style>
