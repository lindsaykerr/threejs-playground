const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        core: './src/main.js',
        bowlingGreen: {
            import : './src/bowling-green/bgreen.js',
            dependOn: ['three', 'gui'],
        },
        steamEngine: {
            import : './src/steam-engine/engine.js',
            dependOn: ['three','gui'],
        },
        three: 'three', 
        gui: 'lil-gui',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../', 'build-dev'),
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      static: './build-dev',
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'bowling green',
          filename: "bowling-green.html",
          chunks: ['three', 'core', 'gui', 'bowlingGreen']
        }),
        new HtmlWebpackPlugin({
            title: 'steam engine',
            filename: "steam-engine.html",
            chunks: ['three','core','steamEngine'],
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
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        }
    },
}