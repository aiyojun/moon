import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'antlr4': 'node_modules/antlr4/dist/antlr4.web.mjs'
    }
  }
})
