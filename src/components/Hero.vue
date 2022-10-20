<template>
  <go-hero
    :heading="content.hero.heading"
    :imgSrc="content.hero.img"
    :imgAlt="content.hero.imgAlt"
    class="hero"
  >
    <go-md :content="content.hero.description"></go-md>
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
  background: linear-gradient(
    to bottom,
    var(--hero-bg-color) 0,
    var(--ccn-primary-color-50) 100%
  );
  .hero-image {
    text-align: right;
    .featured-img {
      width: auto;
      height: 25rem;
    }
  }
}
</style>
