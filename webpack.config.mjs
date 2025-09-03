import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";

export default {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: isProd
            ? "assets/js/[name].[contenthash:8].js"
            : "assets/js/[name].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(woff2?|ttf|otf|eot)$/i,
                type: "asset/resource",
                generator: { filename: "assets/fonts/[name].[hash:8][ext]" }
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: "asset/resource",
                generator: { filename: "assets/images/[name].[hash:8][ext]" }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
        }),
        new ESLintPlugin({ extensions: ["js", "ts"] }),
        ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"),
        port: 5173,
        open: true,
        hot: true
    }
};