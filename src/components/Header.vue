<template>
  <header>
    <GoHeaderBar breakpoint="tablet">
      <GoGovAuLogo slot="logo">
        <img slot="main-brand" :src="logoSrc" alt="CCN Consulting Pty Ltd" />
        <img
          slot="main-brand-on-dark"
          :src="logoSrc"
          alt="CCN Consulting Pty Ltd"
        />
        <div slot="co-brand">
          <div class="text-size-1">
            <b>CCN Consulting Pty Ltd</b>
          </div>
          <div class="text-size-0 d-none d-block-desktop">
            {{ content.slogan }}
          </div>
        </div>
      </GoGovAuLogo>

      <div class="nav-actions" slot="actions">
        <GoButton
          :aria-label="`Switch to ${themeStore.currentTheme} mode`"
          variant="text"
          icon
          round
          flat
          compact
          @click="() => themeStore.toggle()"
        >
          <GoIcon size="1.5rem" icon-set="bx" :name="themeStore.icon"></GoIcon>
        </GoButton>
      </div>

      <GoMainNav slot="main-nav" :items.prop="navItems"></GoMainNav>
    </GoHeaderBar>
  </header>
</template>

<script lang="ts">
import {
  GoIcon,
  GoMainNav,
  GoHeaderBar,
  GoButton,
  GoGovAuLogo,
} from "@go-ui/vue";
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
  components: {
    GoIcon,
    GoMainNav,
    GoHeaderBar,
    GoButton,
    GoGovAuLogo,
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
