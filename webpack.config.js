var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node', 
    externals: [nodeExternals()],
    entry: {
        "client.js" : [
            'babel-polyfill',
            path.resolve(__dirname, 'src/js/client.js')
        ],
        "server.js" : [
            'babel-polyfill',
            path.resolve(__dirname, 'src/js/server.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: "[name]"
    },
    module: {
        loaders: [
        { 
            test: /\.js$/,
            loader: "babel",
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