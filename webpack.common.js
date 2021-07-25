const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const entryNames = [
  'content',
];

const entries = {};
const htmlPlugins = [];
for (const rawName of entryNames) {
  const entryName = rawName.replace(/\//g, '_')
  entries[entryName] = `./src/content/${rawName}.ts`;
  htmlPlugins.push(new HtmlWebpackPlugin({
    filename: `${entryName}.html`,
    template: path.resolve(__dirname, 'src', 'content', 'templates', 'main.html'),
    inject: 'body',
    chunks: [entryName]
  }));
}

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: path.resolve(__dirname, 'src', 'templates', 'main.html'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin({ patterns: [{ from: 'static' }] }),
    new ForkTsCheckerWebpackPlugin({ typescript: { configFile: path.join(__dirname, 'tsconfig.json') } }),
    ...htmlPlugins,
  ],
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
}
