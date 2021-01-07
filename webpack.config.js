const path = require("path");
module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: '',
        path: path.resolve(__dirname, './app'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
}