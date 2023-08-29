import { defineStore, createPinia, setActivePinia } from 'pinia';

interface LayoutStore {
  sideNavHidden: boolean;
}

setActivePinia(createPinia());

export const useLayout = defineStore('layout', {
  state: (): LayoutStore => ({ sideNavHidden: false }),
  actions: {
    toggleSideNav() {
      this.sideNavHidden = !this.sideNavHidden;
    },
  },
});
