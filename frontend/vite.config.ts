import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from `.env` files.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target:
          mode === "development"
            ? "http://localhost:4000" // Local development server
            : "https://your-backend.onrender.com", // Render backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}));
