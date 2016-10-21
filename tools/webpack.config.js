var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    externals: [nodeExternals()],
    target: 'node', 
    entry: {
        "js/client.js" : [
            path.resolve(__dirname, '../js/client.js')
        ],
        "js/server.js" : [
            'babel-polyfill',
            path.resolve(__dirname, '../js/server.js')
        ],
        "css/app.css" : [
            path.resolve(__dirname, '../css/app.css')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "[name]"
    },
    module: {
        loaders: [
        { 
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: 'es2015'
            }
        }, 
        {
            test: /\.css$/, 
            loader: "style-loader!css-loader"
        },
        { 
            test: /\.handlebars$/, 
            loader: "handlebars-loader" 
        }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};