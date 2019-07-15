var path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src') + '/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    devServer: {
        historyApiFallback: true,
    },
    node: {
       net: 'empty',
       tls: 'empty',
       dns: 'empty'
     },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react', '@babel/env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
              test: /\.(png|jpg|gif)$/,
            use: [
            'file-loader'
            ]
          },
          {
            test: /\.svg/,
            use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
        },
              {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
