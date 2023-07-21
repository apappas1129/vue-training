<template>
  <h1>To-do</h1>
  <span>{{ todo?.text }}</span>
  <br />
  <a href="/example">Back</a>
</template>

<script setup>
import { onServerPrefetch, ref, onMounted, computed } from 'vue';
import { subject } from '@casl/ability';
import { useAbility } from '@casl/vue';

import { usePageContext } from '#root/renderer/usePageContext';
import { useTodos } from '#root/stores/useTodos';

const pageContext = usePageContext();
const todoId = parseInt(pageContext.routeParams.todoId);

const { can, rules } = useAbility();
const result = can('update', subject('subject', { authorId: pageContext.user?.id }));
console.log('User can update subject:', result, 'Rules', rules);

const todosStore = useTodos();

const todo = computed(() => todosStore.todoById(todoId));

const loadTodo = async () => {
  await todosStore.fetchTodoById(todoId);
};
onServerPrefetch(loadTodo);
onMounted(loadTodo);
</script>
