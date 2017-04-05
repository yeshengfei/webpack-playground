var webpack = require("webpack");
var path = require("path")


module.exports = {
    entry: {
        app : ['./src/main.js']
    },
    devServer: {
        inline:true,
        contentBase: './dist',
        port:8083,
        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000,
        },
    },
    plugins: [
        // Ignore node_modules so CPU usage with poll
        // watching drops significantly.
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
