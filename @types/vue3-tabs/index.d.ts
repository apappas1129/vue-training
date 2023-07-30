declare module 'vue3-tabs' {
  // I think the library is abandoned and will be left without TS support.
  // below is just a lazy way to supress typescript's whining over undefined Component imports.
  import type { DefineComponent } from 'vue';

  type LazyComponentType = DefineComponent<{}, {}, any>;
  const Tabs: LazyComponentType;
  const Tab: LazyComponentType;
  const TabPanels: LazyComponentType;
  const TabPanel: LazyComponentType;

  export { Tabs, Tab, TabPanels, TabPanel };
}
