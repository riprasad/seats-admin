import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  server: {
    port: 8080,
    proxy: {
      '/aw-api': 'http://localhost:3000',
      '/v1alpha': 'https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com',
      '/api/entitlements/v1': 'https://cloud.redhat.com'
    },
  },
  build: {
    target: "ES2022",
  },
  resolve: {
    // Resolve the 'module' entrypoint at all times (not the default due to Node.js compatibility issues).
    mainFields: ["module"],
  },
  plugins: [react(), checker({ typescript: true })],
});
