const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入tsconfig.json文件
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// 速度分析
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// 多进程打包
const Happypack = require('happypack');
// 打包进度条
const WebpackBar = require('webpackbar');
// antd主题文件
const theme = require('../src/antd/theme');
// 引入config配置
const { webpackEnv } = require('./config');

module.exports = smp.wrap({
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'js/bundle.[hash].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            // use: [{
            //     loader: 'babel-loader'
            // }],
            use: 'Happypack/loader?id=js',
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.(scss|css)$/,
            use: [
                // MiniCssExtractPlugin.loader只能在production环境使用, 不能和style-loader同时存在
                webpackEnv.isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                // MiniCssExtractPlugin.loader只能在production环境使用, 不能和style-loader同时存在
                webpackEnv.isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: theme
                    }
                }
            ],
        }]
    },
    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        }),
        new Happypack({
            id: 'js',
            loaders: ['babel-loader']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.less', '.scss', '.css', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]
        // alias: {
        //     '@': resolve('../src'),
        //     '@components': resolve('../src/components')
        // }
    }
})