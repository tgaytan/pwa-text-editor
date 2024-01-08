const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        short_name: "JATE",
        name: "Just Another Text Editor",
        description: "Just Another Text Editor, but also a PWA",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          },
        ],
        screenshots: [
          {
            src: "assets/icons/icon_512x512.3ca11a97eb7d90b61fc3db0f3c5dcdb6.png",
            type: "image/png",
            sizes: "512x512",
            form_factor: "narrow"
          },
          {
            src: "assets/icons/icon_512x512.3ca11a97eb7d90b61fc3db0f3c5dcdb6.png",
            type: "image/png",
            sizes: "512x512",
            form_factor: "wide"
          }
        ]
      })
      // new WorkboxPlugin.GenerateSW({
      //   swDest: 'src-sw.js',
        // runtimeCaching: [{
        //   urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //   handler: 'CacheFirst',
        //   options: {
        //     cacheName: "images",
        //     expiration: {
        //       maxEntries:5
        //     }
        //   }
        // }]
      // })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };
};
