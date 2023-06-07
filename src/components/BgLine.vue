<template>
  <div class="bg-line-container">
    <!-- prettier-ignore -->
    <svg ref="svg"  viewBox="0 0 783 1668" fill="none" xmlns="http://www.w3.org/2000/svg" class="bg-line">
<path ref="line" d="M370 4V207C360 568 703.602 478.246 759.5 430C843.5 357.5 636.446 249.345 458 276.5C412 283.5 266.5 298.5 193 403.5C145.738 471.017 183.631 555.113 286.5 608.5C444.5 690.5 482.608 736.5 526 791.5C596.587 880.969 496 990.5 377.5 1020.5C241.713 1054.88 59.0003 1059 89.0003 990.5C127.338 902.962 230 1059.75 414.5 1075.25C599 1090.75 704.5 1063.5 679.5 1011C643.662 935.741 202.839 1214.82 48.9999 1192C-42 1178.5 22.4584 1100.19 109 1085.5C244.5 1062.5 370 1126 370 1198C370 1255.6 370 1579.83 370 1664"  stroke-linecap="round"/>
</svg>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    if (!this.$refs.line) {
      return;
    }
    const svg = this.$refs.svg as HTMLElement;
    const path = this.$refs.line as SVGGeometryElement;
    const pathLength = path.getTotalLength();
    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength.toString();
    window.addEventListener('scroll', () => {
      var scrollPercentage =
        document.documentElement.scrollTop /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight);

      // Length to offset the dashes
      var drawLength = pathLength * scrollPercentage;

      // Draw in reverse
      path.style.strokeDashoffset = String(pathLength - drawLength);

      // When complete, remove the dash array, otherwise shape isn't quite sharp
      // Accounts for fuzzy math
      if (scrollPercentage >= 0.99) {
        path.style.strokeDasharray = 'none';
      } else {
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
      }
    });

    const contentEl = document.querySelector('.content') as HTMLElement;
    if (contentEl) {
      setTimeout(() => {
        this.setSvgHeight(contentEl, svg);
      }, 1000);

      window.addEventListener('resize', () => {
        this.setSvgHeight(contentEl, svg);
      });
    }
  },
  methods: {
    setSvgHeight(contentEl: HTMLElement, svg: HTMLElement) {
      const contentH = contentEl.getBoundingClientRect().height;
      svg.style.height = contentH + 'px';
    },
  },
});
</script>
<style lang="scss" scoped>
.bg-line-container {
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  overflow: hidden;
  z-index: -1;

  svg.bg-line {
    width: auto;
    min-width: 400px;
    transform: translate(10%, -1rem);
    path {
      stroke: rgba(#208388, 0.5);
      stroke-width: 0.25rem;
    }
  }
}
</style>
