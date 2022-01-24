require('events').EventEmitter.defaultMaxListeners = 50;
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.js"],
  },
  transpileDependencies: ['tiptap','tiptap-commands','tiptap-utils','vue-swipe-actions'],
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      // '/api': {
      //   // 프록시 요청을 보낼 서버의 주소
      //   target: 'http://localhost:3000'
      // },
      '/api': {
        target: 'http://localhost:4001/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      '/search': {
        target: 'http://localhost:4001/search',
        changeOrigin: true,
        pathRewrite: {
          '^/search': ''
        },
      },
      '/SynapDocViewServer':{
        target: 'http://125.7.235.206:8080/SynapDocViewServer',
        changeOrigin: true,
        pathRewrite: {
          '^/SynapDocViewServer': ''
        }
      }
      
    }
  },
  publicPath: '/',
  assetsDir: 'mobile'
}