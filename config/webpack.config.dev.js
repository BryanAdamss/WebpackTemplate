// 开发环境配置文件

const webpackBase = require('./webpack.config.base.js'); // 引入基础配置
const config = require('./config.js'); // 引入配置

const webpack = require('webpack'); // 用于引用官方插件
const webpackMerge = require('webpack-merge'); // 用于合并配置文件

const webpackDev = { // 开发配置文件
    output: {
        filename: 'js/[name].[hash:8].bundle.js', // 开发环境用hash
    },
    devtool: 'cheap-module-eval-source-map', // 开发环境设置sourceMap，生产环境不使用
    devServer: { // 启动devServer，不会在本地生成文件，所有文件会编译在内存中(读取速度快)
        contentBase: './dist/', // 这个目录下的内容可被访问
        overlay: true, // 错误信息直接显示在浏览器窗口中
        inline: true, // 实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
        hot: true, // 配合webpack.NamedModulesPlugin、webpack.HotModuleReplacementPlugin完成MHR
        // publicPath: config.PUBLIC_PATH, // 静态资源存放位置，根目录的assets文件夹，确保publicPath总是以斜杠(/)开头和结尾。可以设置为CDN地址。这个选项类似url-prefix
        host: "0.0.0.0", // 设置为0.0.0.0并配合useLocalIp可以局域网访问
        useLocalIp: true, // 使用本机IP打开devServer，而不是localhost
        // proxy: {// 可以通过proxy代理其他服务器的api
        //     "/api": "http://localhost:3000"
        // }
    },
    module: {
        rules: [{
            test: /\.css$/, // 开发环境不提取css
            include: [config.SRC_PATH],
            exclude: [config.VENDORS_PATH],
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/, // 开发环境不提取css
            include: [config.SRC_PATH],
            exclude: [config.VENDORS_PATH],
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 开发环境用于标识模块id
        new webpack.HotModuleReplacementPlugin(), // 热替换插件
    ]
};


module.exports = webpackMerge(webpackBase, webpackDev);