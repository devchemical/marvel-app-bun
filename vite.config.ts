import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/application": path.resolve(__dirname, "./src/application"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/domain": path.resolve(__dirname, "./src/domain"),
      "@/presentation": path.resolve(__dirname, "./src/presentation"),
      "@/infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@/components": path.resolve(__dirname, "./src/presentation/components"),
      "@/pages": path.resolve(__dirname, "./src/presentation/pages"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    minify: "esbuild",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
