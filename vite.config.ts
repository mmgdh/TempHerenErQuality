import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define:{
    'process.env':{
      'BASE_API':"http://localhost:3237/bmsapi"
      // "BASE_API":"http://10.10.77.175:8010/bmsapi"
    }
  }
})
