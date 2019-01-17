const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'app.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  devtool: 'inline-source-map', // map文件追踪错误提示
  devServer: {                  // 启动本地开发的node服务器环境（webpack-dev-server）
    port: 8080,                 // 端口
    contentBase: './dist',      // 开发环境的服务目录
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    hot: true,
  },
};
