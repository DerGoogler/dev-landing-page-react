import { resolve, join } from "path";
import { Configuration } from "webpack";
import webpackDevServer from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const defConfig: Configuration = {
  output: {
    filename: "bundle/[name].bundle.js",
    path: resolve(__dirname, "dist"),
    assetModuleFilename: "files/[name].[ext]",
  },
};

const config: Configuration = {
  entry: {
    app: ["./src/index.ts"],
  },
  ...defConfig,
  module: {
    rules: [
      {
        test: /\.hxml$/,
        loader: "haxe-loader",
      },
      {
        test: /(d)?\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.yaml$/,
        use: "js-yaml-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle/[name].bundle.css",
    }),
  ],
  resolveLoader: {
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
  },
  resolve: {
    alias: {
      openfl: resolve(__dirname, "node_modules/openfl/lib/openfl"),
    },
    modules: ["node_modules", join(process.env.NPM_CONFIG_PREFIX || __dirname, "lib/node_modules")],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass", "css"],
  },

  devServer: {
    static: {
      directory: join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};

export { config, defConfig };
