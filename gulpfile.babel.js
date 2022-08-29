"use strict";

// Library dependencies
const gulp = require("gulp");
const postcssNormalize = require("postcss-normalize");
const autoprefixer = require("autoprefixer");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const prettier = require("gulp-prettier");
const eslint = require("gulp-eslint");
const babel = require("gulp-babel");
const minify = require("gulp-minify");
const del = require("del");

// Directory configuration
const paths = {
  js: "./src/js/",
  scss: "./src/scss/",
  img: "./src/img/",
  distJS: "./js/",
  distCSS: "./css/",
  distImg: "./img/",
};

// Deletes files & folders in the compilied CSS, JS & image directories.
function clean(cb) {
  del([paths.distJS + "**", paths.distCSS + "**", paths.distImg + "**"]);
  cb();
}

// Minifies images.
function minImages(cb) {
  gulp.src(`${paths.img}**/*`).pipe(imagemin()).pipe(gulp.dest(paths.distImg));
  cb();
}

// Compiles sass files to CSS.
function compileCSS(cb) {
  const postcssPlugins = [postcssNormalize(), autoprefixer()];

  if (process.env.NODE_ENV === "production") {
    postcssPlugins.push(cssnano());
  }

  gulp
    .src(`${paths.scss}**/*.scss`)
    .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.write()))
    .pipe(gulp.dest(`${paths.distCSS}`));
  cb();
}

// Prettier app files
function prettifyJS(cb) {
  gulp
    .src(paths.js + "**/*.js")
    .pipe(prettier())
    .pipe(gulp.dest(paths.js));
  cb();
}

// Lints JS files
function lintJS(cb) {
  gulp
    .src([paths.js + "**/*.js", "./gulpfile.babel.js"])
    .pipe(eslint())
    .pipe(eslint.format());
  cb();
}

// Compiles JS files
function compileJS(cb) {
  gulp
    .src(`${paths.js}**/*.js`)
    .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.init()))
    .pipe(babel())
    .pipe(
      gulpif(
        process.env.NODE_ENV,
        minify({
          ext: {
            src: ".js",
            min: ".min.js",
          },
        })
      )
    )
    .pipe(gulpif(process.env.NODE_ENV !== "production", sourcemaps.write()))
    .pipe(gulp.dest(paths.distJS));

  cb();
}

function watchJS(cb) {
  gulp.watch(`${paths.js}**/*.js`, gulp.series(lintJS, compileJS));
  cb();
}

function watchImg(cb) {
  gulp.watch(`${paths.img}**/*`, gulp.series(minImages));
  cb();
}

function watchScss(cb) {
  gulp.watch(`${paths.scss}**/*.scss`, gulp.series(compileCSS));
  cb();
}

exports.dev = gulp.series(
  clean,
  minImages,
  compileCSS,
  prettifyJS,
  lintJS,
  compileJS
);
exports.watch = gulp.parallel(watchJS, watchScss, watchImg);
