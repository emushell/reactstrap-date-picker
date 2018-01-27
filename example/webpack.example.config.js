var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname);

var config = {
	entry: SRC_DIR + '/App.jsx',
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/app/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [
						[
							'es2015', {'modules': false}
						],
						'react',
						'stage-0'
					]
				}
			}, {
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: [
					{loader: 'babel-loader'},
					{loader: 'eslint-loader', options: {fix: true}}
				]
			}
		]
	}
};

module.exports = config;