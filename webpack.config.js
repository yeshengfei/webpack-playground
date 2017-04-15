const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

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
    ],
    devServer : {
        watchOptions: {
        // Delay the rebuild after the first change
        aggregateTimeout: 300,
        // Poll using interval (in ms, accepts boolean too)
            poll: 1000,
        },
        historyApiFallback: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        // host: process.env.HOST, // Defaults to `localhost`
        // port: process.env.PORT, // Defaults to 8080
        port: 8081,
        open: true
    }
}

module.exports = (env = "dev") => {
    if(env == "dev") {
        baseConfig.devServer.port = 8081
    }else if(env == "prod"){
        baseConfig.devServer.port = 8080
    }
    return baseConfig;
}
