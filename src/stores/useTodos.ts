import { defineStore } from "pinia";
import { Todo } from "@/common";

interface TodoStoreState {
  todoList: Todo[];
}

export const useTodos = defineStore("todos", {
  state: (): TodoStoreState => ({
    todoList: [],
  }),
  getters: {
    todoById: (state) => (id: Todo["id"]) =>
      state.todoList.find((todo: Todo) => todo.id === id),
  },
  actions: {
    async fetchTodoList() {
      // simulate an API response
      const result = await new Promise<Todo[]>((resolve) =>
        setTimeout(() => resolve(todos), 250)
      );
      this.todoList = result;
    },
    async fetchTodoById(id: Todo["id"]) {
      const result = await new Promise<Todo | undefined>((resolve) =>
        setTimeout(() => resolve(todos.find((todo) => todo.id === id)))
      );
      this.todoList = result ? [result] : [];
    },
  },
});

const todos: Todo[] = [
  {
    id: 0,
    text: "Buy milk",
  },
  {
    id: 1,
    text: "Buy chocolate",
  },
];
