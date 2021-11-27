const path = require('path')
const externals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? null : 'source-map',
  externals: [externals()],

  entry: './src/index.ts',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
    clean: true,
  },

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.twig$/,
        use: ['twig-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  },

  resolve: {
    extensions: ['.json', '.js', '.ts'],
    alias: {
      '@': path.join(process.cwd(), 'src'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'static/[contenthash:5].css' })
  ]
};