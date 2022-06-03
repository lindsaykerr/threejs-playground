const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        core: './src/main.js',
        bowlingGreen: './src/bowling-green/bgreen.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../', 'build'),
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './build',
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Testing ',
        }),
    
      ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.glb/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/gltf/[hash][ext][query]',
                }
            }
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        }
    },
}