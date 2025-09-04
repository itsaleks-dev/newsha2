import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";

export default {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd
      ? "assets/js/[name].[contenthash:8].js"
      : "assets/js/[name].js",
    assetModuleFilename: "assets/[name].[hash:8][ext][query]",
    publicPath: "", // для GitHub Pages
    clean: true,
  },
  module: {
    rules: [
      // HTML + картинки из HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              { tag: "img", attribute: "src", type: "src" },
              { tag: "img", attribute: "srcset", type: "srcset" },
              { tag: "source", attribute: "srcset", type: "srcset" }
            ],
          },
          minimize: isProd,
        },
      },
      // TS / JS
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // SCSS / CSS
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" }, // css -> на уровень вверх к assets/*
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // LESS (если нужно)
      {
        test: /\.less$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      // Шрифты
      {
        test: /\.(woff2?|ttf|otf|eot)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name].[hash:8][ext]" },
      },
      // Картинки
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name].[hash:8][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css",
    }),
    new ESLintPlugin({ extensions: ["js", "ts"] }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/images", to: "assets/images", noErrorOnMissing: true },
        { from: "src/favicon.ico", to: "favicon.ico", noErrorOnMissing: true }
      ],
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
  },
};