const path = require('path')
const sass = require('sass')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = (env) => {
  const miniCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../',
    },
  }
  return {
    mode: env ? 'production' : 'development',
    entry: {main: resolve('src', 'main.js')},
    output: {
      publicPath: '',
      path: resolve('dist'),
      filename: join('js', '[name].[chunkHash].js'),
    },
    resolve: {
      extensions: ['.js', '.vue', '.css', '.scss'],
      alias: {
        '@': resolve('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          loader: [
            env ? miniCssLoader : 'style-loader',
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {implementation: sass}},
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, // 小于limit字节转为base64，大于则进行copy
            name: join('image', '[name].[hash:8].[ext]'),
          },
        },
        {
          test: /\.(mp3|mp4|webm|ogg|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, // 小于limit字节转为base64，大于则进行copy
            name: join('media', '[name].[hash:8].[ext]'),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, // 小于limit字节转为base64，大于则进行copy
            name: join('font', '[name].[hash:8].[ext]'),
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new CompressionWebpackPlugin(),
      new HtmlWebpackPlugin({template: 'index.html'}),
      new CopyWebpackPlugin([{from: 'static', to: 'static', ignore: '.*'}]),
      new MiniCssExtractPlugin({filename: join('css', '[name].[contentHash].css')}),
    ],
    stats: {
      modules: false,
      children: false,
    },
    devServer: {
      stats: 'minimal',
      open: true,
      port: 9999,
    },
  }
}

function resolve(...file) {
  return path.posix.join(__dirname, ...file)
}

function join(...file) {
  return path.posix.join('static', ...file)
}
