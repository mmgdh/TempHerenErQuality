import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    legacy({
      targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks:true,
      polyfills:[
         'es.symbol',
         'es.array.filter',
         'es.promise',
         'es.promise.finally',
         'es/map',
         'es/set',
         'es.array.for-each',
         'es.object.define-properties',
         'es.object.define-property',
         'es.object.get-own-property-descriptor',
         'es.object.get-own-property-descriptors',
         'es.object.keys',
         'es.object.to-string',
         'web.dom-collections.for-each',
         'esnext.global-this',
         'esnext.string.match-all'
     ]
  })],
  define:{
    'process.env':{
      'BASE_API':"http://localhost:3237/bmsapi"
      // "BASE_API":"http://10.10.77.175:8010/bmsapi"
    }
  }
})
