const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin")

//config for the webpack

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    mode: "development",
    devtool: "inline-source-map", //map between the source map and ts script for dev tool
    devServer:{
        static: false,
        port: 3000,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        })
    ]


};