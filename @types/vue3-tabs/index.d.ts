declare module 'vue3-tabs' {
  import type { DefineComponent } from 'vue';
  const Tabs: DefineComponent<{}, {}, any>;
  export { Tabs, DefineComponent as Tab, DefineComponent as TabPanels, DefineComponent as TabPanel };
}
