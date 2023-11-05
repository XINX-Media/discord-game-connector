var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (dirname) => {
    return {
        entry: path.resolve(dirname, 'index.js'),
        output: {
            path: path.resolve(dirname, '..', '..', 'build'),
            filename: 'main.bundle.js'
        },
        resolve: {
            alias: {
                'discord_game_connector': path.resolve(__dirname, '..', 'src', 'index.js'),
            },
        },
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [require.resolve('@babel/preset-env'), {
                                    exclude: ["transform-regenerator"],
                                }],
                                '@babel/preset-react'
                            ],
                            plugins: ["@babel/plugin-proposal-class-properties"]
                        },
                    },
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                        },
                    },
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: {
                        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                        options: {
                            loader: 'image-webpack-loader',
                            options: {
                                optipng: {
                                    optimizationLevel: 4,
                                }
                            }
                        }
                    }
                }
            ]
        },
        stats: {
            colors: true
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(dirname, 'index.tmpl.html')
            })
        ],
    };
}
