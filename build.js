'use strict';

var fs = require("fs");
var browserify = require("browserify");
var stringify = require("stringify");
const sass = require('node-sass');
const autoPrefixer = require('autoprefixer');
const autoPrefix = require('postcss')([autoPrefixer]);

/* Build Main App*/
browserify("app-main/app.js")
    .transform(stringify, {
        appliesTo: {
            includeExtensions: ['.hjs', '.html', '.whatever']
        }
    })
    .transform("babelify", {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream("dist/js/app.js"));

/* Compile SCSS */
let options = {
    file: 'app-main/styles/app.scss',
    outputStyle: 'compressed'
};

sass.render(options, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    autoPrefix.process(result.css.toString())
        .then((result) => {
            let dataString = result.css.toString();
            let kbs = Buffer.byteLength(dataString) / 1000;

            result.warnings().forEach(function(warn) {
                console.warn(warn.toString());
            });
            fs.writeFileSync('dist/css/app.css', dataString, 'utf8');
            fs.writeFileSync('dist/store/css/app.css', dataString, 'utf8');
        });
});
