const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname,'../dist'),
    publicPath: '/public/',     // 生成的url的前缀
  },
  module: {
    rules:[
        {
            test: /.(jsx|js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude:[
                path.join(__dirname,'../node_modules/')
            ]
        },
        {
            test: /.jsx$/,
            loader: 'babel-loader'
        },
        {
            test: /.js$/,
            loader: 'babel-loader',
            exclude: [
                path.join(__dirname,'../node_modules/')
            ]
        }
    ]
}
}
