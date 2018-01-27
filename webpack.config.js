var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/index.jsx",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        [
                            "es2015", {"modules": false}
                        ],
                        "react",
                        "stage-0"
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