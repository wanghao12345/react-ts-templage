module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // 浏览器兼容方案配置
                targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [

    ]
}