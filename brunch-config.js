module.exports = {
    files: {
        javascripts: { joinTo: 'app.js' },
        stylesheets: { joinTo: 'vendor.css' },
    },
    plugins: {
        vue: {
            extractCSS: true,
            out: './public/app.css'
        },
        sass: {
            options:  {
                allowCache: true,
                sourceMapEmbed: true
            }
        },
        babel: {
            presets: [ ['@babel/preset-env', { targets: { browsers: ['> 0.25%','not dead'] }} ] ],
        }
    },
    conventions: {
        ignored: /^test\/*/
    }
};
