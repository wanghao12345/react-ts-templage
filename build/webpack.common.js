const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入tsconfig.json文件
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// 速度分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// 打包进度条
const WebpackBar = require('webpackbar');
// antd主题文件
const theme = require('../src/antd/theme');
// 引入config配置
const { cssBaseLoaders } = require('./config');

module.exports = smp.wrap({
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'js/bundle.[hash].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: ['babel-loader'],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: cssBaseLoaders,
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [...cssBaseLoaders, 'sass-loader'],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [...cssBaseLoaders, {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true,
                    modifyVars: theme
                }
            }]
        }]
    },
    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.less', '.scss', '.css', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]
    }
})