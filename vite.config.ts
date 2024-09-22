/** @format */

import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CalHeatmap',
      fileName: (format) => `cal-heatmap.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'dayjs', '@leafer-in/flow', '@leafer-ui/interface', 'leafer-ui'],
      output: {
        globals: {
          vue: 'Vue',
          'leafer-ui': 'leafer-ui',
          dayjs: 'dayjs',
          '@leafer-in/flow': '@leafer-in/flow',
          '@leafer-ui/interface': '@leafer-ui/interface'
        }
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/App.vue', 'src/main.ts'],
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
