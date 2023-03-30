import path from "node:path";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    mainFields: ["module"],
  },
  build: {
    target: "esnext",
    sourcemap: "inline",
    lib: {
      name: "client",
      entry: path.resolve(__dirname, "./service.ts"),
    },
    rollupOptions: {
      external: ['uri-template-lite'],
    }
  },
  plugins: [
    checker({ typescript: true }),
    dts({ insertTypesEntry: true }),
  ],
});
