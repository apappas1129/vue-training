<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
/**
 * NOTE: This component and the other 3 child components will be written in JS for now because
 * Tiptap is still patching up things to comply to the new ESM module exports and its yet to be released.
 * See https://github.com/ueberdosis/tiptap/pull/4001 and for an example of what happens currently:
 * https://github.com/ueberdosis/tiptap/issues/3785
 */

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
