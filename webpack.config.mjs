import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';

export default {
    entry: './src/main.mjs',
    output: {
        filename: 'app.js',
        path: '/var/www/html'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.m?js$/,
                loader: 'babel-loader'
            },
            // this will apply to both plain `.(s)css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.s?css$/,
                use: [
                  'vue-style-loader',
                  'sass-loader',
                  'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};