let HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'app.bundle.js'
    },
    plugins: [new HTMLWebpackPlugin({
        title: "Project",
        minify:{
            collapseWhitespace: true
        },
        hash: true,
        template: __dirname+"/src/index.ejs"
    })]
}