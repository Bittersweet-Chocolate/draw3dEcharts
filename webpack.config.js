/*
    基于node.js平台运行，模块化默认采用common.js
*/
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {

        // 模式  production  development
        mode: 'development',

        // webpack配置
        entry: './js/main.js',
        output: { //输出文件
            // 代表当前文件的目录绝对路径
            path: resolve(__dirname + '/dist'),
            filename: 'js/[name].[chunkhash].js'
        },
        // loader的配置 对于webpack不能识别的资源
        module: {
            rules: [{
                    // 匹配哪些文件
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        // 创建style标签，将js中的样式资源插入，添加到head中生效
                        fallback: "style-loader",
                        // 将css文件变成commonjs模块加载到js中
                        use: "css-loader"
                    })  
            },

            // // 处理不了html中的图片
            // {
            //     test: /\.(jgp|png|gif)$/,
            //     loader: 'url-loader',
            //     options: {
            //         // 图片大小 小于8kb，就会被base64处理
            //         // 优点：减少请求数量
            //         // 缺点：图片体积更大
            //         limit: 8 * 1024,
            //         // 关闭es6的模块解析，使用common.js模块解析
            //         esModule: false,
            //         // 取图片的hash的前10位  [ext]原文件拓展名
            //         name: '[hash:10].[ext]'
            //     }
            // }, {
            //     test: /\.html$/,
            //     // 处理html图片
            //     loader: 'html-loader'
            // },
            // // 处理其他资源
            // {
            //     exclude: /\.(html|js|css|less)/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[hash:10].[ext]'
            //     }
            // }

        ]
    },
    // plguins的配置
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/vendor',
            to: __dirname + '/dist/vendor'
        }]),
        new ExtractTextPlugin("css/style.css"),
    ],

    // 开发服务器 用来自动化(自动编译，自动打开开浏览器)
    // 只会在内存中编译打包 不会有任何输出
    // 启动devServer指令为 npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        prot: 3000,
        // 自动打开浏览器
        open: true
    }
}