let HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

let isProd = process.NODE_ENV === "production";
let scssDev = ['style-loader', 'css-loader', 'sass-loader'];
let scssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: __dirname+'/dist'
});
let scssConfig = isProd ? scssProd : scssDev;

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {test:/\.scss$/, use: scssConfig},
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
        disable: !isProd,
        allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ]
}