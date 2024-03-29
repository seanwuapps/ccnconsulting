<template>
  <header>
    <GoSkipLink to="main">Skip to main</GoSkipLink>
    <GoNavDrawer ref="mobileMenu" label="Menu" .items="navItems" />
    <GoHeaderBar breakpoint="tablet">
      <GoGovAuLogo slot="logo" href="/">
        <img slot="main-brand" :src="logoSrc" alt="CCN Consulting Pty Ltd" />
        <img slot="main-brand-on-dark" :src="logoSrc" alt="CCN Consulting Pty Ltd" />
        <div slot="co-brand">
          <div class="sitename">CCN Consulting Pty Ltd</div>
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
          @click="() => themeStore.toggle()">
          <GoIcon size="1.5rem" :name="themeStore.icon"></GoIcon>
        </GoButton>
      </div>

      <GoButton
        slot="mobile-menu-trigger"
        aria-label="menu"
        compact
        icon
        flat
        variant="text"
        @click="handleMobileTriggerClick">
        <GoIcon icon-set="bx" name="menu" size="1.5rem" slot="prefix"></GoIcon>
      </GoButton>

      <GoMainNav slot="main-nav" .items="navItems"></GoMainNav>
    </GoHeaderBar>
  </header>
</template>

<script lang="ts">
import { GoIcon, GoMainNav, GoHeaderBar, GoButton, GoGovAuLogo, GoSkipLink, GoNavDrawer } from '@go-ui/vue';
import { defineComponent } from 'vue';
import { useThemeStore } from '../stores/theme.store';
import content from '../content';

export default defineComponent({
  setup() {
    const themeStore = useThemeStore();
    themeStore.init();
    return { themeStore, content };
  },
  data() {
    let logoSrc = '/img/logo.svg';
    let navItems: any[] = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Jobs',
        url: '/jobs',
      },
      {
        label: 'Contact',
        url: '/#contact-us',
      },
      {
        label: 'Work with us',
        url: 'https://form.jotform.com/230490537104045',
        linkAttrs: {
          target: '_blank',
        },
      },
    ];
    return {
      logoSrc,
      navItems,
    };
  },
  methods: {
    handleMobileTriggerClick() {
      (this.$refs.mobileMenu as any).$el.open();
    },
  },
  components: {
    GoIcon,
    GoMainNav,
    GoHeaderBar,
    GoButton,
    GoGovAuLogo,
    GoSkipLink,
    GoNavDrawer,
  },
});
</script>

<style lang="scss" scoped>
.sitename {
  font-weight: bold;
  font-family: var(--go-heading-font-family);
}
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
