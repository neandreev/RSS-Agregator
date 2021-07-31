const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],
};
