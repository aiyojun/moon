import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'antlr4': 'node_modules/antlr4/dist/antlr4.web.mjs'
    }
  },
  server: {
    proxy: {
      "/fs":{
        target: "http://10.8.7.6:8000/",
        rewrite: (p) => p.replace(/^\/fs/, ""),
        changeOrigin: true
      }
    },
  },
})
