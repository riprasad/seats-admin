import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import dts from "vite-plugin-dts";
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    mainFields: ["module"],
  },
  build: {
    sourcemap: "inline",
    lib: {
      name: "components",
      entry: path.resolve(__dirname, "src/main.ts"),
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)]
    },
  },
  plugins: [
    react(),
    checker({ typescript: true }),
    dts({ insertTypesEntry: true }),
  ],
});
