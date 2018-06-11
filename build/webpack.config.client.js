const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV==='development'

const config = {
    entry: {
        app: path.join(__dirname,'../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public/'     // 生成的url的前缀
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
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
} 

if(isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config