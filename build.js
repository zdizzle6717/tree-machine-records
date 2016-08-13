'use strict';

var fs = require("fs");
var browserify = require("browserify");
var stringify = require("stringify");

/* Build Main App*/
browserify("app-main/app.js")
.transform(stringify, {
      appliesTo: { includeExtensions: ['.hjs', '.html', '.whatever'] }
    })
.transform("babelify", {
        presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream("dist/js/app.js"));


/* Build Store App*/
browserify("app-store/app.jsx")
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("dist/store/js/app.js"));
