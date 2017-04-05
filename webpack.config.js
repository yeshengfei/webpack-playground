var path = require("path")

module.exports = {
    entry: {
        app : ['./src/main.js']
    },
    devServer: {
        inline:true,
        contentBase: './dist',
        port:8083
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
