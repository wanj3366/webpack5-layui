const webpack = require("webpack")
const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require("html-webpack-plugin")// 在dist目录下生成新的index.html文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 生成文件前清理dist目录下的所有文件
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'], // 入口js
    output: { // 出口设置
        filename: 'static/[name].[contenthash].bundle.js', // 出口打包js
        chunkFilename: '[id].js',
        charset:true, // HTML 的 <script> 标签添加 charset="utf-8" 标识
        publicPath: process.env.NODE_ENV === 'production'?'./':'/',
        path: path.resolve(__dirname, 'dist/'), // 出口目录
        // pathinfo: false // 输出结果不携带路径信息
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','jsx','json'],//表示，这几个文件的后缀名，可以省略不写
        alias: { // 表示别名
            '@': path.join(__dirname, './src'), // 这样，@ 就表示 项目根目录中 src 的这一层路径
            layer:path.join(__dirname, './assets/js/layer/layer.js'),
            "layer.css":path.join(__dirname, './assets/js/layer/theme/default/layer.css')
        }
    },
    optimization: { // 提取公共模块，防止模块重复
        moduleIds: 'deterministic',
        runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
        splitChunks: {
            cacheGroups: { // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',// 同时分割同步和异步代码,推荐。
                }
            },
            // chunks: 'all', // 同时分割同步和异步代码,推荐。
            // name: 'common'
        },
        minimizer: [
            new TerserPlugin({
                test:/\.js(\?.*)?$/i, // 默认值 /\.m?js(\?.*)?$/i
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin({
                cache: true,
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            })
        ],
    },
    plugins: [ // 插件管理
        new CleanWebpackPlugin(),// 生成文件前清理dist目录下的所有文件
        new HtmlWebpackPlugin({// 在dist目录下生成新的index.html文件
            template: "./index.html",
            minify: {
                // 压缩html
                collapseWhitespace: true, // 压缩空白
                removeComments: true // 去除注释
            }
        }),
        new webpack.ProvidePlugin({
            // $:"jquery",
            // jquery:"jquery",
            // jQuery:"jquery",
            // "window.jQuery":"jquery"
        })
    ],
    target: ["web", "es5"], // combining targets
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'] // 'transform-runtime' 插件告诉 Babel 要引用 runtime 来代替注入
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.txt/,
                type: 'asset',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader','sass-loader']
            }, {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.less$/i,
                loader: "less-loader", // 将 Less 文件编译为 CSS 文件
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            }, {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ]
    }
}
