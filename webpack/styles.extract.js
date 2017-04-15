

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
        require('autoprefixer')
    ]),
  },
}

exports.extractCSS = ({regExp, include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  if(use) {
      use.push(postCssLoader)
  }

  return {
    module: {
      rules: [
        {
          test: regExp,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};
