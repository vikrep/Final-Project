// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: './src/index.jsx',
//     output: {
//         path: path.resolve('dist'),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /(node_modules|bower_components)/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['react', 'es2015', 'stage-3']
//                 }
//             }
//         ]
//     },
//     plugins: [new HtmlWebpackPlugin({
//         template: './src/index.html',
//         filename: 'index.html',
//         inject: 'body'
//     })],
//     devServer: {
//         historyApiFallback: true
//     },
//     externals: {
//         // global app config object
//         config: JSON.stringify({
//             apiUrl: 'http://localhost:4000'
//         })
//     }
// }

module.exports = {
    entry: ['./src/index.js'],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      ]
    },
    debug: true,
    devtool: 'cheap-source-map',
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  };
  