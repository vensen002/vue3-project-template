import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 使用 UnoCSS 引擎
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    UnoCSS({
      // 预设
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
        // ...custom presets
      ],
      // 自定义规则
      rules:  [],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
