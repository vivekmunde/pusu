const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'pusu.development.js',
    globalObject: 'this',
    library: 'pusu',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  }
}