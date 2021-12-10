

  const path = require('path')
module.exports = {
    devServer: {
        proxy: {  //配置跨域
          '/api/': {
            target: 'http://localhost:3000/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
            changOrigin: true,  //允许跨域
            pathRewrite: {
              '^/api': '' 
            }
          },
        }
      },
  publicPath: '/',
  lintOnSave: false,    //解决eslint报错
  // 支持 gql 文件
  chainWebpack: config => {
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  }
}