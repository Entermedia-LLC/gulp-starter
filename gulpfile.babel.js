// Dependencies
import gulp from 'gulp'
import babel from 'gulp-babel'
import del from 'del'
import cond from 'gulp-cond'
import eslint from 'gulp-eslint'
import prettier from 'gulp-prettier'
import sourcemaps from 'gulp-sourcemaps'
import minify from 'gulp-minify'
import sass from 'gulp-sass'
import stylelint from 'gulp-stylelint'
import autoprefixer from 'autoprefixer'
import sassdoc from 'sassdoc'
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'
import imagemin from 'gulp-imagemin'
import todo from 'gulp-todo'
import { argv } from 'yargs'

// If --prod flag set, update environment to production.
if (argv.prod) {
  process.env.NODE_ENV = 'production'
}

// Directory configuration
const paths = {
  js: './src/js/',
  scss: './src/scss/',
  img: './src/img/',
  distJS: './js/',
  distCSS: './css/',
  distImg: './img/'
}

// Deletes files & folders in the compilied CSS, JS & image directories.
export const clean = () => {
  return del([paths.distJS + '**', paths.distCSS + '**', paths.distImg + '**'])
}

// Prettier app files
export const prettierJS = () => {
  return gulp
    .src(paths.js + '**/*.js')
    .pipe(prettier())
    .pipe(gulp.dest(paths.js))
}

// Prettier gulp.babel.js file
export const prettierGulp = () => {
  return gulp.src('./gulpfile.babel.js').pipe(prettier()).pipe(gulp.dest('./'))
}

// Lints JS files
export const lintJS = () => {
  return gulp
    .src([paths.js + '**/*.js', './gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
}

// Compiles JS files
export const compileJS = (done) => {
  return gulp
    .src([paths.js + '**/*.js'])
    .pipe(cond(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(babel())
    .pipe(
      cond(
        process.env.NODE_ENV,
        minify({
          ext: {
            src: '.js',
            min: '.min.js'
          }
        })
      )
    )
    .pipe(cond(process.env.NODE_ENV !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(paths.dist_js))
}

// Lints CSS files.
export const lintCSS = () => {
  return gulp.src(paths.scss + '**/*.scss').pipe(
    stylelint({
      syntax: 'scss',
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }]
    })
  )
}

// Compiles sass files to CSS.
export const compileCSS = () => {
  return gulp
    .src([paths.scss + '**/*.scss'])
    .pipe(cond(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(sassdoc())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        autoprefixer(),
        cond(process.env.NODE_ENV === 'production', cssnano())
      ])
    )
    .pipe(cond(process.env.NODE_ENV !== 'production', sourcemaps.write()))
    .pipe(gulp.dest(paths.distCSS))
}

// Minifies images.
export const minImages = () => {
  return gulp
    .src(paths.img + '**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.distImg))
}

// Generates a TODO report.
export const generateTODO = () => {
  return gulp
    .src([paths.scss + '**/*.scss', paths.js + '**/*.js'])
    .pipe(todo())
    .pipe(gulp.dest('./'))
}

// Watches image files and triggers minImages on change.
export const watchImages = () => {
  gulp.watch(paths.img + '**/*', minImages)
}

// Watches scss files and triggers the compileCSS task on change.
export const watchSass = () => {
  gulp.watch(
    paths.scss + '**/*.scss',
    gulp.series(generateTODO, lintCSS, compileCSS)
  )
}

// Watches JS files and triggers the JS tasks on change.
export const watchJS = () => {
  gulp.watch(paths.js + '**/*.js', gulp.series(generateTODO, lintJS, compileJS))
}

// Runs all build tasks, then watches files for changes to trigger a recompile.
export const watch = (done) => {
  gulp.series(
    clean,
    prettierGulp,
    lintJS,
    lintJS,
    lintCSS,
    compileCSS,
    minImages,
    gulp.parallel(watchJS, watchSass, watchImages)
  )(done)
}

// Runs all build tasks
export const build = (done) => {
  gulp.series(
    clean,
    prettierGulp,
    lintJS,
    lintJS,
    lintCSS,
    compileCSS,
    minImages
  )(done)
}
