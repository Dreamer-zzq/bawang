const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // 入口文件
    // entry: './src/index.js', // 单入口, chunk名称为main
    // 多入口
    entry: {
        // chunk
        home: './src/index.js',
        detail: './src/info/detail.js',
        cart: './src/cart/mycart.js'
    },
    // 输出地
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    // 加载器
    module: {
        rules: [
            // babel-loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // css-loader style-loader(在<head>添加了<style>)
            // {test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.css$/, use: [CssExtractPlugin.loader, 'css-loader'] },
            // url-loader
            {
                test: /\.(jpe?g|gif|bmp|png|svg)$/, use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30 * 1024
                    }
                }
            }
        ]
    },
    // 插件
    plugins: [
        // 自动创建一个html文件(默认为index.html)，并通过<script>引入打包后的js文件
        // new HtmlWebpackPlugin()

        // 以template为模块创建一个html文件，并在<body>中添加<script>引入打包后的js文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            // favicon: './src/assets/favicon.ico',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: './src/cart/mycart.html',
            // favicon: './src/assets/favicon.ico',
            chunks: ['cart']
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: './src/info/detail.html',
            // favicon: './src/assets/favicon.ico',
            chunks: ['detail']
        }),
        new CssExtractPlugin({
            filename: '[name].css' // 生成一个css文件,默认为main.css
        }), 
        new CopyPlugin([
            {from: './public', to: ''} // 复制到output.path指定的目录
        ]),
        new CleanWebpackPlugin() // 打包前自动清空output.path指定的目录
    ]
    ,
    devServer: { // 以output.path指定的目录作为项目的根目录
        port: 8080,
        open: true // 自动打开浏览器
    }
};