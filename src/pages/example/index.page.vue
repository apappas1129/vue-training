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
  <button @click="randomNavigation">Random Page</button>
</template>

<script lang="ts">
/* Refer to [vite-plugin-ssr Custom Exports/Hooks] */
export const documentProps = { title: 'Home' };
</script>

<script lang="ts" setup>
import { onServerPrefetch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { navigate } from 'vite-plugin-ssr/client/router'
import { useCounter } from '#root/stores/useCounter';
import { useTodos } from '#root/stores/useTodos';

const counterStore = useCounter()
const { count } = storeToRefs(counterStore)

const todosStore = useTodos()
const { todoList } = storeToRefs(todosStore)

const loadTodos = async () => {
  await todosStore.fetchTodoList()
}
onServerPrefetch(loadTodos)
onMounted(() => {
  loadTodos();

  const loginData = {
        email: 'student@elearning.com',
        password: 'password',
      };

      fetch('http://localhost:4400/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
})

const randomNavigation = () => {
  const randomIndex = Math.floor(Math.random() * 3)
  navigate(['/about', '/todos/1', '/contacts'][randomIndex])
}
</script>
