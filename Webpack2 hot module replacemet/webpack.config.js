let HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {test:/\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test:/\.pug$/,use:['html-loader','pug-html-loader']}
        ]
    },
    devServer: {
        contentBase: __dirname+"/dist",
        compress: true,
        port: 8080,
        stats: "errors-only",
        hot: true,
        open: true
    },
    plugins: [new HTMLWebpackPlugin({
        title: "Project",
        minify:{
            collapseWhitespace: true
        },
        hash: true,
        template: __dirname+"/src/index.pug"
    }),new ExtractTextPlugin({
        filename:'app.css',
        disable: true,
        allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ]
}