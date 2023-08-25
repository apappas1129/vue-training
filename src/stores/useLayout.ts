import { defineStore } from 'pinia';

interface LayoutStore {
  sideNavHidden: boolean;
}

export const useLayout = defineStore('layout', {
  state: (): LayoutStore => ({ sideNavHidden: false }),
  actions: {
    toggleSideNav() {
      this.sideNavHidden = !this.sideNavHidden;
    },
  },
});
