const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "chat-react.js",
    libraryTarget: 'commonjs2',
    library: 'ReactChatElements',
  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      //{test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/, enforce: 'pre'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.(png|jpg|gif|svg)$/,  //对图片文件，使用 url-loader里的加载器处理
        loader: 'url-loader',
        options: {
          limit: 8192,   //限制图片文件字节，大于8KB则不生成base64 用路径引用替代（相当于file－loader）
          name: '[name].[ext]?[hash]' //文件名
        }
      }
    ]
  }
};
