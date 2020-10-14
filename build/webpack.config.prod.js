const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')
// 将css提取出来，成为独立的文件，只能用在webpack4和production中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清除指定目录下的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: []
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new CleanWebpackPlugin()
    ]
})