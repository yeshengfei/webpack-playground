const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const devServer = require('./webpack/dev-server')
const merge = require('webpack-merge')
const stylesExtract = require('./webpack/styles.extract.js')

const baseConfig = {
    devtool: 'source-map',
    entry : {
        app: path.join(__dirname, 'src', 'main.js'),
        vendor: ['vue']
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
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
    ],
    module:
        merge(
            {
                rules: []
            }
            //require("./webpack/styles")
        )
}

var finalConfig = merge(baseConfig, devServer,
    stylesExtract.extractCSS({ use: ['css-loader', 'less-loader'], regExp: /\.(css|less)$/ })
)

module.exports = (env = "dev") => {
    if(env == "dev") {
        finalConfig.devServer.port = 8081
    }else if(env == "prod"){
        finalConfig.devServer.port = 8080
    }
    return finalConfig;
}
