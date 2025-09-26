import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Expense-Tracker/", // <-- Important
  server: {
    proxy: {
      "/api": "http://localhost:5001",
    },
  },
});
