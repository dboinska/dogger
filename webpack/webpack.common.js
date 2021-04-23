const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html').map(
    dir =>
      new HtmlWebpackPlugin({
        favicon: paths.src + '/static/favicon.png',
        template: dir, //paths.src + '/template.html', // template file
        filename: path.basename(dir), //'index.html', // output file
      })
  );

module.exports = {
  entry: [`${paths.src}/index.js`],

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    ...generateHTMLPlugins(),
  ],

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@': paths.src,
    },
  },
};
