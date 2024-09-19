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
    rollupOptions: {
      external: ['vue', 'dayjs', '@leafer-in/flow', '@leafer-ui/interface', 'leafer-ui'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModulesRoot: './',
          preserveModules: true
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModulesRoot: './',
          preserveModules: true,
          exports: 'named'
        }
      ]
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CalHeatmap'
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    }),
    dts({
      entryRoot: 'src',
      outDir: ['dist/es', 'dist/lib'],
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
