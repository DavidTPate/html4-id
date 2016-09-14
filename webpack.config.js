'use strict';
const webpack = require('webpack');
module.exports = {
    entry: './lib/index.js',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        filename: 'html4-id.min.js',
        library: [
            'window'
        ]
    },
    module: {
        loaders: [
            {
                test: require.resolve('./lib/index'),
                loader: 'expose?idify'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};