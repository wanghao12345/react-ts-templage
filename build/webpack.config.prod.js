const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')
// 将css提取出来，成为独立的文件，只能用在webpack4和production中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 自动清除生成的文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 可视化分析包的大小
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 压缩单独的css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')

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
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false // 关闭自动打开默认浏览器
        }),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new UglifyJsWebpackPlugin({
            test: /\.js(\?.*)?$/i,
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        })
    ]
})