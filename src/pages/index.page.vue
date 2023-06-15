<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img height="100" src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img height="100" src="../assets/pinia.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1> 🔌 vite-plugin-ssr + Pinia Integration</h1>
  <a href="https://vite-plugin-ssr.com/pinia" target="_blank">https://vite-plugin-ssr.com/pinia</a>
  <br />
  <span>Counter that keeps its state on navigation</span>:
  <button type="button" @click="counterStore.increment">Counter {{ count }}</button>
  <h2>To-do List</h2>
  <ul>
    <li v-for="item in todoList" :key="item.id">
      <a :href="`/todos/${item.id}`">
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onServerPrefetch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounter } from '@/stores/useCounter';
import { useTodos } from '@/stores/useTodos';

const counterStore = useCounter()
const { count } = storeToRefs(counterStore)

const todosStore = useTodos()
const { todoList } = storeToRefs(todosStore)

const loadTodos = async () => {
  await todosStore.fetchTodoList()
}
onServerPrefetch(loadTodos)
onMounted(loadTodos)
</script>
