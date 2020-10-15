// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * webpack 环境变量
 */
const webpackEnv = {
    isEnvDevelopment: process.env.NODE_ENV === 'development',
    isEnvProduction: process.env.NODE_ENV === 'production'
};
/**
 * css 的基础loaders
 */
const cssBaseLoaders = [
    webpackEnv.isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
]


module.exports = {
    webpackEnv,
    cssBaseLoaders
}