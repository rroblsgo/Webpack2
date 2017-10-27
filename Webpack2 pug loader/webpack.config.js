let HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {test:/\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: __dirname+'/dist'
            })},
            {test:/\.pug$/,use:['html-loader','pug-html-loader']}
        ]
    },
    devServer: {
        contentBase: __dirname+"/dist",
        compress: true,
        port: 8080,
        stats: "errors-only",
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
        disable: false,
        allChunks: true
    })
    ]
}