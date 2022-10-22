<template>
  <h2>Services</h2>
  <div
    v-for="(feature, i) in services"
    :class="`feature-card ${i % 2 === 0 ? '' : 'alt'}`"
    :key="`feature-card-${i}`"
    flat
  >
    <div class="feature-card__img" v-if="feature.img">
      <img :src="feature.img" :alt="feature.imgAlt" />
    </div>
    <div class="feature-card__text">
      <h3>{{ feature.heading }}</h3>
      <go-md :content="feature.text"></go-md>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import content from "../content";

export default defineComponent({
  setup() {
    const { services } = content;
    return {
      services,
    };
  },
});
</script>

<style lang="scss">
@import "@go-ui/core/src/global/scss/utils";

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 5rem 0;
  width: 100%;
  @include tablet {
    flex-direction: row;
    align-items: center;
    min-height: 50vh;
    margin: 10rem 0;
    gap: 5rem;
    flex: 1;
    &.alt {
      flex-direction: row-reverse;
    }
    &__text {
      flex-basis: 60%;
      width: 60%;
    }
    &__img {
      width: 40%;
    }
  }
  img {
    width: 100%;
  }
}
</style>
