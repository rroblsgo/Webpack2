let HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: __dirname+'/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {test:/\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: __dirname+'/dist'
            })},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
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
        hash: true,
        excludeChunks: ['contact'],
        template: __dirname+"/src/index.ejs"
    }),new HTMLWebpackPlugin({
        title: "Contact",
        hash: true,
        chunks: ['contact'],
        filename: 'contact.html',
        template: __dirname+"/src/contact.ejs"
    }),new ExtractTextPlugin({
        filename:'app.css',
        disable: false,
        allChunks: true
    })
    ]
}