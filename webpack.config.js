const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const production = new webpack.DefinePlugin({
//   "process.env": {
//     NODE_ENV: JSON.stringify("production")
//   }
// });

module.exports = {
  entry: path.resolve(__dirname + "/src/index.js"),
  output: {
    path: path.join(__dirname, "assets"),
    filename: "bundle.js",
    publicPath: "/assets/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(process.cwd(), "src"),
        enforce: "pre",
        // loader: "babel-loader",
        use: ["eslint-loader", "babel-loader"],
        options: { presets: ["es2015", "react", "stage-2"] }
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  },
  plugins: [new ExtractTextPlugin("styles/bundle.min.css")]
};
