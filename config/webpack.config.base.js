// 基础配置文件，包含了不同环境通用配置

const path = require('path'); // nodejs路径模块，用于读取路径
const fs = require('fs'); // nodejs文件模块，用于读取文件

const config = require('./config.js'); // 获取配置

const HTMLWebpackPlugin = require('html-webpack-plugin'); // 用于生成html

// 获取html文件名，用于生成入口
const getFileNameList = (path) => {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0]);
        }
    });
    return fileList;
};

let htmlDirs = getFileNameList(config.HTML_PATH);

let HTMLPlugins = []; // 保存HTMLWebpackPlugin实例
let Entries = {}; // 保存入口列表

// 生成HTMLWebpackPlugin实例和入口列表
htmlDirs.forEach((page) => {
    let htmlConfig = {
        filename: `${page}.html`,
        template: path.join(config.HTML_PATH, `./${page}.html`) // 模板文件
    };

    let found = config.ignorePages.findIndex((val) => {
        return val === page;
    });

    if (found === -1) { // 有入口js文件的html，添加本页的入口js和公用js，并将入口js写入Entries中
        htmlConfig.chunks = [page, 'commons'];
        Entries[page] = `./src/${page}.js`;
    } else { // 没有入口js文件，chunk为空
        htmlConfig.chunks = [];
    }

    const htmlPlugin = new HTMLWebpackPlugin(htmlConfig);
    HTMLPlugins.push(htmlPlugin);
});

module.exports = {
    context: config.PROJECT_PATH, // 入口、插件路径会基于context查找
    entry: Entries,
    output: {
        path: config.BUILD_PATH, // 打包路径，本地物理路径
    },
    module: {
        rules: [{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            include: [config.SRC_PATH],
            exclude: [config.VENDORS_PATH], // 忽略第三方的任何代码
            use: [{ // 导入字体文件，并最打包到output.path+ options.name对应的路径中
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            include: [config.SRC_PATH],
            exclude: [config.VENDORS_PATH],
            use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
                loader: 'url-loader',
                options: {
                    limit: 8192, // 8k
                    name: 'img/[name].[ext]', // 回退使用file-loader时的名称
                    fallback: 'file-loader', // 当超过8192byte时，会回退使用file-loader
                }
            }]
        }, {
            test: /\.js$/,
            include: [config.SRC_PATH],
            exclude: [config.VENDORS_PATH, config.NODE_MODULES_PATH],
            use: ['babel-loader']
        }]
    },
    plugins: [
        ...HTMLPlugins, // 扩展运算符生成所有HTMLPlugins
    ]
};