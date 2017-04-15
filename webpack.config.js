const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
        })
    ]
}
