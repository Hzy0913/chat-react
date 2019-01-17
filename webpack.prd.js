const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
const prdWebpackConfig= {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "chat-react.js",
    libraryTarget: 'commonjs2'  //模块输出方式
  },
  externals: {
    react: 'react' //打包时候排除react
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: []
};

if (NODE_ENV !== 'publish') {
  prdWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prdWebpackConfig;
