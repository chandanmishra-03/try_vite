import { defineConfig } from 'vite'


import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import ViteComponents, {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'vite-plugin-components'
/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    Vue(),
    VueJsx(),
    ViteComponents({
      customComponentResolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
        VantResolver(),
      ]
    }),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    }
  ],
  build: {
    minify: false
  },
  css: {
    // todo 引用全局css 未生效（https://github.com/vitejs/vite/issues/650）
    // https://github.com/vitejs/vite/issues/520
  loaderOptions: {
  }
},
  optimizeDeps: {
    include: [ "axios", 'ant-design-vue', '@ant-design-vue/use']
  },

  //jsx config
  jsx: {
    factory: 'h',
    fragment: 'Fragment'
  },

  proxy: {
    // proxy: {
    //   ‘/api‘: {
    //     target: ‘http://jsonplaceholder.typicode.com‘,
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ‘‘),
    //   },
    // },
  },
}