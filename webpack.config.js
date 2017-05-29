
module.exports = {
  entry: './src/Routes.js',

  output: {
    path: './static',
    filename: 'app.bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
