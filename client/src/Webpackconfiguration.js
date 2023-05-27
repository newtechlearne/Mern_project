const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // ... other configurations

    rules: [{



        test: /\.html$/,
        exclude: /node_modules/,

        use: { loader: 'html-loader' }


    }, ],


    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}