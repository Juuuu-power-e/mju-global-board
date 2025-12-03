// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 백엔드 주소
        changeOrigin: true
        // 필요하면 여기서 rewrite도 가능하지만 지금은 그대로 사용
        // rewrite: (path) => path
      }
    }
  }
});
