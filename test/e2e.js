"use strict";

const assert = require("node:assert/strict");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const lightningcss = require("../index.js");
const test = require("node:test");
const { readFileSync } = require("fs");

test("Ensure output are minified with source maps", async function () {
  await new Promise(function (resolve) {
    gulp
      .src("test/inputs/*.css")
      .pipe(sourcemaps.init())
      .pipe(lightningcss())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("test/tmp"))
      .on("end", resolve);
  });

  ["merge-adjacent-rules", "shorthand"].forEach(function (test) {
    const stylesheet = readFileSync(`test/tmp/${test}.css`);
    const expectedStylesheet = readFileSync(`test/outputs/${test}.css`);
    assert.strictEqual(Buffer.compare(stylesheet, expectedStylesheet), 0);

    const sourcemaps = readFileSync(`test/tmp/${test}.css.map`);
    const expectedSourcemaps = readFileSync(`test/outputs/${test}.css.map`);
    assert.strictEqual(Buffer.compare(sourcemaps, expectedSourcemaps), 0);
  });
});
