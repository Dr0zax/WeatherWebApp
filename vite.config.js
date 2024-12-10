import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    target: 'es2022',
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        weatherAlerts: resolve(__dirname, "src/weather-alerts.html"),
      }
    },
  },
  server: {
    hmr: false
  }
});
