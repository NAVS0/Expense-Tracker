import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine base path for GitHub Pages or Vercel
const base = process.env.VITE_DEPLOY === "github" ? "/Expense-Tracker/" : "./";

export default defineConfig({
  plugins: [react()],
  base, // Use relative or repo-based path depending on deployment
  server: {
    proxy: {
      "/api": "http://localhost:5001", // Dev backend proxy
    },
  },
});
