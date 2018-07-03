const path = require('path')

module.exports = {
  output: {
    path: path.join(__dirname,'../dist'),
    publicPath: '/public/',     // 生成的url的前缀
  },
  resolve: {
    extensions: ['.js', '.jsx']   //可以忽略 import  的后缀名  .js  .jsx
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
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
    ]
}
}
