const path = require('path');
module.exports = {
    mode: "production",
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
        path: path.resolve(__dirname, '../docs/assets/scripts/', 'build'),
        clean: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    /*devServer: {
      static: './build',
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Testing ',
        }),
    
      ],
     */ 

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