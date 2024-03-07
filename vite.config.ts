import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    solid(),
  ],
});
