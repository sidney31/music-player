import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      jsmediatags: "jsmediatags/dist/jsmediatags.min.js",
      "@": ["/src"],
      "@Providers": ["/src/Providers"],
      "@Components": ["/src/Components"],
      "@Services": ["/src/Services"],
    },
  },
});
