import { defineStore } from 'pinia';

interface CounterStore {
  count: number;
}

export const useCounter = defineStore('counter', {
  state: (): CounterStore => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
