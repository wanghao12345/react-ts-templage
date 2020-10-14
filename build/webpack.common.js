const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * webpack 环境变量
 */
const webpackEnv = {
    isEnvDevelopment: process.env.NODE_ENV === 'development',
    isEnvProduction: process.env.NODE_ENV === 'production'
};


module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            use: [{
                loader: 'babel-loader'
            }],
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    }
}