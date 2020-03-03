const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\*.js/,
                use: 'babel-loader',
                exclude: /node-modules/
            }
        ]
    }
};
