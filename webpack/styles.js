const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
        require('autoprefixer')    
    ]),
  },
}

module.exports = {
    rules : [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',postCssLoader],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader',postCssLoader],
      },
    ]
}
