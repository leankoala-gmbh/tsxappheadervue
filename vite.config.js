import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime()
    .toString()
}
export default defineConfig({
  plugins: [
    Components({
      dirs: ['./src/components'],
      dts: true
    }),
    AutoImport({
      dts: './auto-imports.d.ts',
      defaultExportByFilename: false,
      vueTemplate: true,
      include: [
        /\.[tj]sx?$/,
        /\.vue\??/,
        /\.mdx?$/
      ],
      dirs: [
        './src/composables/**',
        './src/composables',
        './src/utils/**',
        './src/utils'
      ],
      imports: [
        'vue'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    vue({
      script: {
        refSugar: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    // lib: {
    //   entry: path.resolve(__dirname, 'src/index.ts'),
    //   name: 'TsxAppHeader',
    //   fileName: (format) => `tsxAppHeader.${format}.js`
    // },
    cssCodeSplit: false,
    rollupOptions: {
      external: Object.keys(pkg.dependencies || {}),

      output: {
        // globals: {
        //   vue: 'Vue'
        // },
        entryFileNames: 'tsxAppHeader.js',
        chunkFileNames: 'tsxAppHeader-[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'tsxAppHeader.css'
          return assetInfo.name
        }
      }
    }
  }
})
