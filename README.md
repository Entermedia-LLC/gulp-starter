# gulp-starter [![Build Status](https://travis-ci.com/Entermedia-LLC/gulp-starter.svg?branch=master)](https://travis-ci.com/Entermedia-LLC/gulp-starter)

> Rapidly setup [gulp](https://gulpjs.com/) with pre-built tasks that help enforce coding standards, provide backwards compatibility, generates documentation & helps boost performance.

- CMS agnostic for maximum flexibility
- Supports ECMAScript 2015+ code using [Babel](https://babeljs.io/)
- Uses [Sass](https://sass-lang.com/) to compile CSS &amp; [cssnano](https://cssnano.co/) to compress files
- Automatically adds CSS vendor prefixes using [autoprefixer](https://www.npmjs.com/package/autoprefixer)
- Helps keep SCSS & CSS consistant using best practices using [stylelint](https://stylelint.io/)
- Lints JS files using [eslint](https://eslint.org/), auto formats using [Prettier](https://prettier.io/) &amp; minifies using [gulp-minify](https://www.npmjs.com/package/gulp-minify)
- Generates source maps using [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- Minifies images using [imagemin](https://github.com/imagemin/imagemin), including `webp` conversions
- Parses and outputs `TODO`s and `FIXME`s from code comments to a `TODO.md` file using [gulp-todo](https://www.npmjs.com/package/gulp-todo)

## Project setup

```
npm install
```

If using Entermedia's [SCSS base project styles](https://github.com/Entermedia-LLC/scss) and after downloading to `src/scss`, run:

```
npm install --legacy-peer-deps
```

### Compiles for development

```
npm run dev
```

### Compiles for development &amp; watches for file changes

```
npm run watch
```

### Compiles &amp; minifies for production

```
npm run build
```
