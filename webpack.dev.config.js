const { merge } = require("webpack-merge");
const base = require("./webpack.config");


module.exports = merge(base,{

    devServer: {
        publicPath: '',
        contentBase: './app',
        port: 3000,
        hot: true,
    }
})