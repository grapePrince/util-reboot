var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CompressionPlugin = require("compression-webpack-plugin");
var Webpack = require("webpack");

const commonConfig = {
    output: {
        path: path.resolve(__dirname, '../build/util'),
        filename: "[name]"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

const clientConfig = Object.assign({}, commonConfig, {
    target: "web",
    entry: {
        "js/client.js" : [
            'babel-polyfill',
            path.resolve(__dirname, '../js/client.js')
        ],
        "css/app.css" : [
            path.resolve(__dirname, '../css/app.css')
        ]
    },
     module: {
        loaders: [
        { 
            test: /\.js$/,
            loader: "babel",
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, 
        {
            test: /\.css$/, 
            loader: "style-loader!css-loader"
        }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});

const serverConfig = Object.assign({}, commonConfig, {
    externals: [nodeExternals()],
    target: "node", 
    entry: {
        "js/server.js" : [
            'babel-polyfill',
            path.resolve(__dirname, '../js/server.js')
        ]
    },
     module: {
        loaders: [
        { 
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, 
        { 
            test: /\.handlebars$/, 
            loader: "handlebars-loader" 
        }
        ]
    }
});

module.exports = [clientConfig, serverConfig]; 
