// vue.config.js
module.exports = {
  devServer: {    
    proxy: {
      '/judge': {
        target: '167.179.92.37:5000',
        ws: false,
        changeOrigin: true
      },
      '/': {
        target: 'http://localhost:8080',
        ws: false,
        changeOrigin: true
      },
    },
    port: '21541',
  }
}
