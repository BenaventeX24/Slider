const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./index.webpack.js",
  },
  output: {
    filename: "slider.min.js",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: "file-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  /*plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["lib"],
    }),
  ],*/
};
