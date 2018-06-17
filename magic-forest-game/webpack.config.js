let path = require("path");

let conf = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: "dist/"
  }
};

module.exports = (env, options) => {
  let production = options.mode === "production";

  conf.devtool = production
                ?"source-map"
                :"eval-sourcemap"
  return conf;
}
