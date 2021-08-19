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
      '/api/form': {
        target: 'http://localhost:4001/api/form',
        changeOrigin: true,
        pathRewrite: {
          '^/api/form': ''
        }
      },
      '/api/config': {
        target: 'http://localhost:4001/api/config',
        changeOrigin: true,
        pathRewrite: {
          '^/api/config': ''
        }
      },
      '/api/languages': {
        target: 'http://localhost:4001/api/languages',
        changeOrigin: true,
        pathRewrite: {
          '^/api/languages': ''
        }
      },
      '/api/keyword': {
        target: 'http://localhost:4001/api/keyword',
        changeOrigin: true,
        pathRewrite: {
          '^/api/keyword': ''
        }
      },
      '/search/search': {
        target: 'http://localhost:4000/search/search',
        changeOrigin: true,
        pathRewrite: {
          '^/search/search': ''
        }
      },
      '/api/approval': {
        target: 'http://localhost:4001/api/approval',
        changeOrigin: true,
        pathRewrite: {
          '^/api/approval': ''
        }
      },
      '/api/board': {
        target: 'http://localhost:4001/api/board',
        changeOrigin: true,
        pathRewrite: {
          '^/api/board': ''
        }
      },
      '/api/schedule': {
        target: 'http://localhost:4001/api/schedule',
        changeOrigin: true,
        pathRewrite: {
          '^/api/schedule': ''
        }
      },
      '/api/mail': {
        target: 'http://localhost:4001/api/mail',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mail': ''
        }
      },
      '/api/myinfo': {
        target: 'http://localhost:4001/api/myinfo',
        changeOrigin: true,
        pathRewrite: {
          '^/api/myinfo': ''
        }
      },
      
    }
  },
  publicPath: '/',
  assetsDir: 'mobile'
}