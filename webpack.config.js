const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonImporter = require('node-sass-json-importer');
const autoprefixer = require('autoprefixer');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const miniCSSPlugin = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/[id].css"
});

const SVGSpriteLoader = new SpriteLoaderPlugin();

const HTMLPlugin = new HtmlWebpackPlugin({
  template: SRC_DIR + '/index.html',
  filename: 'index.html',
  inject: false
});

const config = {
  isProduction: false,
  disallowWatch: false
};

const options = {
  entry: SRC_DIR + '/app/index.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'not IE < 11')]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importer: jsonImporter,
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true
        }
      }
    ]
  },
  plugins: [
    miniCSSPlugin,
    //SVGSpriteLoader,
    HTMLPlugin
  ],
  devServer: {
    contentBase: DIST_DIR,
    inline: true
  },
};

module.exports = (env = config) => {
  if (env.isProduction) {
    options.mode = 'production';
  }

  return options;
};
