'use strict';

const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(__dirname, './public');
const args = require('yargs').argv;
const YAML = require('yamljs');

// Read Hexo config YAML.
const siteConfig = YAML.load('_config.yml');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let isProd = args.prod;
let isDev = args.dev;

let entry = ['./themes/radar/code/site.js'];
let devtool;

if (isDev) {
    entry.push('webpack-dev-server/client?http://0.0.0.0:8080');
    devtool = 'source-map';
}

let plugins = [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        chunks: 'app'
    })
];

if (isProd) {
    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    );
}

module.exports = {
    entry: entry,

    output: {
        path: buildPath,
        publicPath: siteConfig.root,
        filename: 'js/[name].js'
    },

    module: {
        loaders: [
            { test: /\.json$/, loader: 'json'},
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass') },
            { test: /\.(png|jpg|ico)$/, exclude: /node_modules/, loader: 'file-loader?name=images/[name].[ext]&context=./src/images' }
        ]
    },

    quiet: false,
    noInfo: false,

    plugins: plugins,

    devtool: devtool,

    devServer: {
        contentBase: buildPath,
        host: '0.0.0.0',
        port: 8080
    }
};

