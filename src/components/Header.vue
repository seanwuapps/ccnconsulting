<template>
  <header>
    <go-header-bar breakpoint="tablet">
      <go-gov-au-logo slot="logo">
        <img slot="main-brand" :src="logoSrc" alt="CCN Consulting Pty Ltd" />
        <img slot="main-brand-on-dark" :src="logoSrc" alt="CCN Consulting Pty Ltd" />
        <div slot="co-brand">
          <div class="text-size-1">
            <b>CCN Consulting Pty Ltd</b>
          </div>
          <div class="text-size-0 d-none d-block-desktop">
            {{ content.slogan }}
          </div>
        </div>
      </go-gov-au-logo>

      <div class="nav-actions" slot="actions">
        <go-button
          :aria-label="`Switch to ${themeStore.currentTheme} mode`"
          variant="text"
          icon
          round
          flat
          compact
          @click="() => themeStore.toggle()"
        >
          <go-icon
            size="1.5rem"
            icon-set="bx"
            :name="themeStore.icon"
          ></go-icon>
        </go-button>
      </div>

      <go-main-nav slot="main-nav" :items.prop="navItems"></go-main-nav>
    </go-header-bar>
  </header>
</template>

<script lang="ts">
import { INavItem } from "@go-ui/core/dist/types/interfaces";
import { defineComponent } from "vue";
import { useThemeStore } from "../stores/theme.store";
import content from "../content";

export default defineComponent({
  setup() {
    const themeStore = useThemeStore();
    themeStore.init();
    return { themeStore, content };
  },
  data() {
    let logoSrc = "/img/logo.svg";
    let navItems: INavItem[] = [
      {
        label: "About",
        url: "#about",
      },
      {
        label: "Services",
        url: "#services",
      },
      {
        label: "Contact us",
        url: "#contact-us",
      },
    ];
    return {
      logoSrc,
      navItems,
    };
  },
  methods: {
    handleMobileTriggerClick() {
      (this.$refs.mobileMenu as any).open();
    },
  },
});
</script>

<style lang="scss" scoped>
app-header {
  position: sticky;
  top: 0;
  background: var(--go-color-bg);
  z-index: var(--layer-3);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
