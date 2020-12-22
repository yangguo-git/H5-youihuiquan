module.exports = {
    // 将baseUrl: '/api',改为baseUrl: '/',
    publicPath:'./',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 100, // 换算的基数
                        selectorBlackList: ['van'], // 忽略要转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
    lintOnSave: false,
    // devServer: {//本地调试使用
    //     /*disableHostCheck: true,*/
    //     proxy: {
    //         "/api": {
    //             //你要跨域的域名(包含host、端口号,切记：一定要带上http头); //同一个域名只能设置一次跨域，否则重复报错！
    //             target: "https://tworktelecom.weein.cn", //线上请求地址
    //             ws: true, // 是否启用websockets
    //             secure:true, // 使用的是http协议则设置为false，https协议则设置为true
    //             changeOrigin: true, //是否跨域，设置为true;(必须)
    //             pathRewrite: {
    //                 '^/api': ''
    //             }
    //         }
    //     }
    // }
};
