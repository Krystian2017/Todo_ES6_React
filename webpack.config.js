const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new OptimizeJsPlugin({
    sourceMap: false
  })
];

module.exports = (env) => {
  const environment = env || 'production';

  return {
    mode: environment,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.' + environment + '.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: false
    },
    plugins: plugins 
  }
};