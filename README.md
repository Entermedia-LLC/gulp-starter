# gulp-starter [![Build Status](https://travis-ci.com/bmarshall511/gulp-starter.svg?branch=master)](https://travis-ci.com/bmarshall511/gulp-starter)

> Rapidly setup [gulp](https://gulpjs.com/) with pre-built tasks that help enforce coding standards, provide backwards compatibility, generates documentation & helps boost performance.

* CMS agnostic for maximum flexibility
* Supports ECMAScript 2015+ code using [Babel](https://babeljs.io/)
* Uses [Sass](https://sass-lang.com/) to compile CSS &amp; [cssnano](https://cssnano.co/) to compress files
* Automatically adds CSS vendor prefixes using [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* Self-documents SCSS files using [sassdoc](http://sassdoc.com/)
* Helps keep SCSS & CSS consistant using best practices using [stylelint](https://stylelint.io/)
* Lints JS files using [eslint](https://eslint.org/), auto formats using [Prettier](https://prettier.io/) &amp; minifies using [gulp-minify](https://www.npmjs.com/package/gulp-minify)
* Generates source maps using [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* Minifies images using [imagemin](https://github.com/imagemin/imagemin)
* Parses and outputs `TODO`s and `FIXME`s from code comments to a `TODO.md` file using [gulp-todo](https://www.npmjs.com/package/gulp-todo)

## Optional Add-ons

### WordPress

**Using [Elementor](https://elementor.com/) with the [Hello Elementor theme](https://elementor.com/hello-theme/)?** Use the [hello-elementor-child](https://github.com/bmarshall511/hello-elementor-child) theme for seamless integration with gulp-starter.

* `css/add-ons/wordpress/elementor.css` - Elementor-specific styles & overrides.<br />

## Project setup
```
npm install
```

### Compiles for development
```
npm run compile
```

### Compiles for development &amp; watches for file changes
```
npm run watch
```

### Compiles &amp; minifies for production
```
npm run build
```

## Development

### SCSS & CSS
An optional `css/code.css` stylesheet is compilied and can be included in the project to rapidly setup global styles (i.e. [normalize](https://necolas.github.io/normalize.css/), base elements, typography &amp; form styles).

#### SCSS & CSS Variables
Both SCSS & CSS variables are found in `src/scss/config/_settings.scss` and `src/scss/config/_root.scss`. These represent the default values and **should not be directly edited**. Instead, the `src/scss/config/_variables.scss` should be used to change or add additional variables.

### TODOs & FIXMEs
The compilation tasks create a TODO.md file for inline code TODOs & FIXMEs. See [leasot](https://www.npmjs.com/package/gulp-todo) for usage &amp; more information.
