const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const devServer = require('./webpack/devServer.config')
const merge = require('webpack-merge')

const baseConfig = {
    entry : {
        app: path.join(__dirname, 'src', 'main.js')
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'webpack demo'
        }),
        // Ignore node_modules so CPU usage with poll
        // watching drops significantly.
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ])
    ]
}

var finalConfig = merge(baseConfig,devServer)

module.exports = (env = "dev") => {
    if(env == "dev") {
        finalConfig.devServer.port = 8081
    }else if(env == "prod"){
        finalConfig.devServer.port = 8080
    }
    return finalConfig;
}
