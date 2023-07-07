import vue from "@vitejs/plugin-vue";
import ssr from "vite-plugin-ssr/plugin";
import md from "vite-plugin-md";
import { UserConfig } from "vite";
import path from "path";
// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), ssr(), md()],
  // TODO: prove that this works and is useful. currently if you comment this out, sfc files that refer to assets
  // with relative pathing works perfectly fine without this configuration below.
  // More of this from: https://vitejs.dev/config/shared-options.html#assetsinclude
  // and https://vitejs.dev/guide/assets.html#importing-asset-as-url
  assetsInclude: ["src/assets/*"],
  resolve: {
    alias: {
      // We prefix path aliases with '#', see https://vite-plugin-ssr.com/path-aliases#vite
      "#root": path.resolve(__dirname, "./src/"),
    },
  },
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  optimizeDeps: { include: ["express", "compression", "vue", "pinia"] },
};

export default config;
