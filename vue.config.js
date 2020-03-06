// vue.config.js   
module.exports = {
  devServer: {        // 这里配置的请求映射只限于开发者模式，如果你打包上线了，这个就不会起作用了哦。
    proxy: 'http://47.115.54.133:8080',
    port: '21542',
  }
}
