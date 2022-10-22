<template>
  <go-hero
    :heading="content.hero.heading"
    img-src="/img/hero.svg"
    img-alt="Hero section illustration"
    class="hero"
  >
    <go-md
      md-options="{html: true}"
      :content="content.hero.description"
    ></go-md>
  </go-hero>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "../content";

export default defineComponent({
  setup() {
    return {
      content,
    };
  },
});
</script>

<style lang="scss">
go-hero {
  --hero-padding-top: 10vh;
  --hero-padding-bottom: 10vh;
  position: relative;
  background: linear-gradient(
    to bottom,
    var(--hero-bg-color) 0,
    var(--ccn-primary-color-50) 100%
  );
  .hero-image {
    text-align: right;
    .featured-img {
      transform: translateY(0);
      animation: float 3s ease-in-out infinite alternate;
      max-width: 100%;
    }
  }
}
@keyframes float {
  to {
    transform: translateY(-1rem);
  }
}
</style>
