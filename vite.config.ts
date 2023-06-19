import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [vue(), ssr()],
  resolve: {
    alias: {
      // We prefix path aliases with '#', see https://vite-plugin-ssr.com/path-aliases#vite
      '#root': path.resolve(__dirname, './src/')
    }
  },
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  optimizeDeps: { include: ['express', 'compression', 'vue', 'pinia'] }
}

export default config
