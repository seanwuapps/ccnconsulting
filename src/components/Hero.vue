<template>
  <GoHero
    :heading="content.hero.heading"
    class="hero"
    @mousemove="handleMouseMove"
    @touchmove="handleTouchMove"
    ref="hero">
    <div
      aria-hidden="true"
      id="bg-wrap"
      slot="full-width-bg"
      :style="{
        '--x': `${x}px`,
        '--y': `${y}px`,
      }">
      {{ letters }}
    </div>
    <GoMd md-options="{html: true}" :content="content.hero.description"></GoMd>
  </GoHero>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GoHero, GoMd } from '@go-ui/vue';
import content from '../content';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function makeString(length = 5000) {
  let result = '';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default defineComponent({
  setup() {
    return {
      content,
    };
  },
  components: {
    GoHero,
    GoMd,
  },
  data() {
    return {
      letters: makeString(),
      heroBgRect: null as DOMRect | null,
      x: 0,
      y: 0,
      reduceMotion: false,
    };
  },
  mounted() {
    this.heroBgRect = (this.$refs.hero as InstanceType<typeof GoHero>).$el.getBoundingClientRect();
    this.letters = makeString();
    this.reduceMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  },
  methods: {
    handleMouseMove(e) {
      const { clientX, clientY } = e;
      this.setXY(clientX, clientY);
    },
    handleTouchMove(e) {
      const { clientX, clientY } = e.touches[0];
      this.setXY(clientX, clientY);
    },
    setXY(clientX = 0, clientY = 0) {
      if (this.reduceMotion) {
        return;
      }
      if (!this.heroBgRect) {
        return;
      }
      this.letters = makeString();
      const { left, top } = this.heroBgRect;
      this.x = clientX - left;
      this.y = clientY - top;
    },
  },
});
</script>

<style lang="scss">
#app {
  .hero {
    overflow: hidden;
  }
  go-hero {
    --hero-text-box-padding: 2rem 0;
    --hero-text-flex-basis: 100%;
    --hero-image-flex-basis: 0;
    .hero-text {
      font-weight: normal;
      backdrop-filter: none;
    }
    .hero-text-bg {
      display: none;
    }
  }
  .home {
    go-hero {
      --hero-full-width-bg-padding: 0;
      --hero-bg-color: black;
      --hero-fg-color: white;
      .hero-text {
        text-shadow: 0 0 1rem var(--hero-fg-color);
      }
      .full-width-bg {
        transform: none;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        #bg-wrap {
          display: none;
          @supports (background-clip: text) or (-webkit-background-clip: text) {
            aspect-ratio: 1;
            display: block;
            word-break: break-all;
            font-size: clamp(1rem, 0.8vw, 2rem);
            font-family: monospace;
            font-weight: 300;
            background-image: radial-gradient(
              farthest-corner at var(--x) var(--y),
              var(--hero-fg-color) 0%,
              rgba(var(--go-token-secondary-500), 0.6) 15%,
              rgba(var(--go-token-success-600), 0.9) 50%,
              rgba(var(--go-token-lightest), 0) 100%
            );
            user-select: none; // chrome and Opera
            -moz-user-select: none; // Firefox
            -webkit-text-select: none; // IOS Safari
            -webkit-user-select: none; // Safari
            -webkit-background-clip: text; /* clip the background to the text inside the tag*/
            -webkit-text-fill-color: transparent;
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
