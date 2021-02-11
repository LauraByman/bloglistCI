// module.exports = {
// 	module: {
// 		rules: [
// 			{
// 				test: /\.js$/,
// 				use: {
// 					loader: '@sucrase/webpack-loader',
// 					options: {
// 						transforms: ['jsx']
// 					}
// 				}
// 			}
// 		]
// 	}
// };

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = (env, argv) => {

  const backend_url = argv.mode === 'production'
  ? 'https://bloglistci.herokuapp.com'
  : 'http://localhost:3001'

  return {
  entry: ['@babel/polyfill', './client/src/index.js'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
					  presets: [
              ['@babel/preset-env', {
						  'targets': 'defaults'
              }],
              '@babel/preset-react'
					  ]
          }
				  }]
      },
      {
        test:  /\.html$/,
        use: { loader: 'html-loader' }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './resources/imgs',
              name: '[name].[ext]'
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url) 
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    clientLogLevel: 'silent',
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
	  },
	  module: {
    rules: [
		  {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, './client/src/'),
        exclude: /node_modules/,
        use: [{
			  loader: 'babel-loader',
			  options: {
            presets: [
				  ['@babel/preset-env', {
                'targets': 'defaults'
				  }],
				  '@babel/preset-react'
            ]
			  }
        }]
		  }
    ]
    }
  }

}

module.exports = config

