const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyPlugin([
      {
        from: "./src/static",
        to: "static",
      },
    ]),
  ];

  if (env === "production") {
    plugins.push(new CleanWebpackPlugin());
  }

  return {
    entry: ["./src/scripts/app.js", "./src/styles/global.css"],
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false
                },
                // pngquant: {
                //   quality: [0.6, 1]
                // },
                gifsicle: {
                  interlaced: false
                }
                // the webp option will enable WEBP
                // webp: {
                //   quality: 75
                // }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts"
              }
            }
          ]
        }
      ]
    },
    plugins
  };
};
