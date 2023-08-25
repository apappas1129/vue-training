<template>
  <a href="https://vitejs.dev" target="_blank">
    <img style="height: 100px" src="/vite.svg" class="logo" alt="Vite logo" />
  </a>
  <a href="https://vuejs.org/" target="_blank">
    <img style="height: 100px" src="../../assets/pinia.svg" class="logo vue" alt="Pinia logo" />
  </a>
  <h1 class="border-none p-0">🔌 vite-plugin-ssr + Pinia Integration</h1>
  <a href="https://vite-plugin-ssr.com/pinia" target="_blank">https://vite-plugin-ssr.com/pinia</a>
  <br />
  <span>Counter that keeps its state on navigation:</span>
  <button
    type="button"
    @click="counterStore.increment"
    class="block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
  >
    Counter: {{ count }}
  </button>
  <hr />
  <h2 class="border-none p-0">To-do List</h2>
  <ul role="list">
    <li v-for="item in todoList" :key="item.id">
      <a :href="`/todos/${item.id}`">
        {{ item.text }}
      </a>
    </li>
  </ul>
  <button
    @click="randomNavigation"
    class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 my-4"
  >
    Go to random page
  </button>
</template>

<script lang="ts">
/* Refer to [vite-plugin-ssr Custom Exports/Hooks] */
export const documentProps = { title: 'Home' };
</script>

<script lang="ts" setup>
import { onServerPrefetch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
// import { navigate } from 'vite-plugin-ssr/client/router';
import { useCounter } from '#root/stores/useCounter';
import { useTodos } from '#root/stores/useTodos';

const counterStore = useCounter();
const { count } = storeToRefs(counterStore);

const todosStore = useTodos();
const { todoList } = storeToRefs(todosStore);

const loadTodos = async () => {
  await todosStore.fetchTodoList();
};
onServerPrefetch(loadTodos);
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
});

const randomNavigation = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  // navigate(['/about', '/todos/1', '/contacts'][randomIndex]);
  window.location.href = ['/about', '/todos/1', '/contacts'][randomIndex];
};
</script>
