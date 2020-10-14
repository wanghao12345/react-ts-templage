/**
 * webpack 环境变量
 */
export const webpackEnv = {
    isEnvDevelopment: process.env.NODE_ENV === 'development',
    isEnvProduction: process.env.NODE_ENV === 'production'
};