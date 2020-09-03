module.exports = {
    devServer:{
        proxy:{
            "/api": {
              "target": "http://chat.memestech.com.cn",
              "changeOrigin":true
            }
        }
    }
}