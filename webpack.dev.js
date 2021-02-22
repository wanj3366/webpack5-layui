const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-source-map', // eval-cheap-module-source-map
    devServer: { // webpack-dev-server 为你提供了一个简单的 web 服务器 实时重新加载   默认端口 9000
        port: 9000
    }
})