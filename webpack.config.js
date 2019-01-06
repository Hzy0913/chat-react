const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV)
module.exports = {
  // entry: {'chat': './src/index'},
  entry: NODE_ENV === 'production' ? path.resolve(__dirname, 'src/index.js') : path.resolve(__dirname, 'app.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js",
    // libraryTarget: 'commonjs2',
    // library: 'ReactChatElements',
  },
  // output: {
  //   path: path.resolve(__dirname, 'lib'),
  //   filename: 'chat-react.js'
  // },
  // externals: {
  //   react: 'react'
  // },
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
    }),
    // new webpack.DefinePlugin({
    //   __DEVTOOLS__: process.env.NODE_ENV === 'development', //判断node环境变量为development是赋值为true
    //   __PRO__: process.env.NODE_ENV === 'production', //判断node环境变量为development是赋值为true
    // }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  // devtool: 'inline-source-map', // map文件追踪错误提示
  devServer: {                  // 启动本地开发的node服务器环境（webpack-dev-server）
    port: 8080,                 // 端口
    contentBase: './dist',      // 开发环境的服务目录
    historyApiFallback: true,
    inline: true,
    hot: true,
  },
};

// if (NODE_ENV === 'production') {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new CleanWebpackPlugin(['lib']), // 清除dist目录下的旧文件
//     new ExtractTextPlugin('[name].[contenthash].css'),// 抽离css
//   ]);
// }
