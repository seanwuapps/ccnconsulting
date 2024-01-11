import { defineStore } from 'pinia';

const themeIcons = {
  light: 'light_mode',
  dark: 'dark_mode',
};
export type Theme = 'light' | 'dark';

const THEME_LOCAL_STORAGE_KEY = 'go-ui-theme';

export function getCurrentTheme(): Theme {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
  if (storedTheme) {
    isDark = storedTheme === 'dark';
  }
  return isDark ? 'dark' : 'light';
}

export const useThemeStore = defineStore('theme', {
  state: () => {
    return { currentTheme: 'light' as Theme };
  },
  getters: {
    icon: (state) => themeIcons[state.currentTheme],
  },
  actions: {
    init() {
      this.currentTheme = getCurrentTheme();
      this.setHtmlAttribute();
    },
    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setHtmlAttribute();
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, this.currentTheme);
    },
    setHtmlAttribute() {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    },
  },
});
