// 全局配置，比如 HTML 文件的路径、publicPath 等

const path = require('path');

// __dirname是当前文件所在目录，process.cwd()是node当前工作的目录，即package.json所在目录

const PROJECT_PATH = process.cwd(); // 项目目录

const config = {
    PROJECT_PATH, // 项目目录
    CONFIG_PATH: path.join(__dirname), // 配置文件目录
    SRC_PATH: path.join(PROJECT_PATH, './src/'), // 源文件目录
    BUILD_PATH: path.join(PROJECT_PATH, './dist/'), // 打包目录
    PUBLIC_PATH: '/assets/', // 静态文件存放目录
    HTML_PATH: path.join(PROJECT_PATH, './src/html/'),
    VENDORS_PATH: path.join(PROJECT_PATH, './src/vendors/'), // vendors目录
    NODE_MODULES_PATH: path.join(PROJECT_PATH, './node_modules/'), // node_modules目录
    ignorePages: ['test'], // 标识没有入口js文件的html
};

console.log('\n/-----相关路径-----/\n');
console.log(config);
console.log('\n/-----相关路径-----/\n');

module.exports = config;