const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const devServer = require('./webpack/dev-server')
const merge = require('webpack-merge')
const stylesExtract = require('./webpack/styles.extract.js')
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');



const baseConfig = {
    devtool: 'source-map',
    entry : {
        app: path.join(__dirname, 'src', 'main.js'),
        vendor: ['vue']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]-[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname, 'build')]),
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
        new BabiliPlugin( ),
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        })

    ],
    module:
        merge(
            {
                rules: []
            }
            //require("./webpack/styles")
        ),
    performance: {
        hints: 'warning', // 'error' or false are valid too
        maxEntrypointSize: 100000, // in bytes
        maxAssetSize: 450000, // in bytes
    }
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
