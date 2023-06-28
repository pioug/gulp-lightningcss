# gulp-lightningcss ![Run tests](https://github.com/pioug/gulp-lightningcss/workflows/Run%20tests/badge.svg)

> Gulp plugin for [Lightning CSS](https://lightningcss.dev/).

## Install

```sh
$ npm install gulp-lightningcss
```

### Example

```js
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const lightningcss = require("gulp-lightningcss");
const options = {
  minify: true, // Default
  sourceMap: true, // Default
};

gulp
  .src("stylesheet.css")
  .pipe(sourcemaps.init())
  .pipe(lightningcss(options))
  .pipe(sourcemaps.write(""))
  .pipe(gulp.dest("build"));
```

- See https://lightningcss.dev/docs.html for more options
- See https://github.com/gulp-sourcemaps/gulp-sourcemaps for advance usage of sourcemaps
