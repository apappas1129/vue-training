<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import MenuBar from './MenuBar.vue';

export default {
  components: {
    EditorContent,
    MenuBar,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Highlight],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
    console.log('editor', this.editor);
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="postcss">
.editor {
  @apply bg-white border border-basic-400 rounded text-basic-900 flex flex-col max-h-screen;
}

.editor__header {
  @apply flex items-center bg-slate-950  border-b-2 border-b-slate-950 flex-wrap flex-none p-1;
}

.editor__content {
  @apply flex flex-auto overflow-auto px-5 py-4;
  -webkit-overflow-scrolling: touch;
}

.ProseMirror:focus {
  @apply outline-none;
}
</style>
