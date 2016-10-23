var path = require('path');
var nodeExternals = require('webpack-node-externals');

const commonConfig = {
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "[name]"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

const clientConfig = Object.assign({}, commonConfig, {
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
    }
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
