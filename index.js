"use strict";

const path = require("node:path");
const { Transform } = require("node:stream");
const browserslist = require("browserslist");
const lightningcss = require("lightningcss");
const PluginError = require("plugin-error");
const applySourceMap = require("vinyl-sourcemaps-apply");

module.exports = function ({
  minify = true,
  sourceMap = true,
  targets = lightningcss.browserslistToTargets(browserslist()),
  ...options
} = {}) {
  const stream = new Transform({ objectMode: true });
  stream._transform = function (file, enc, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    if (file.isStream()) {
      callback(
        new PluginError("gulp-lightningcss", "Streaming is not supported")
      );
      return;
    }

    if (file.isBuffer()) {
      const { error, code, map } = lightningcss.transform({
        code: file.contents,
        minify,
        sourceMap,
        targets,
        ...options,
      });

      if (error) {
        callback(new PluginError("gulp-lightningcss", error.message));
        return;
      }

      file.contents = code;

      if (file.sourceMap && map) {
        const mapObject = JSON.parse(map.toString());
        mapObject.file = file.relative;
        mapObject.sources = [].map.call(mapObject.sources, function (source) {
          return path.join(path.dirname(file.relative), source);
        });
        applySourceMap(file, mapObject);
      }

      callback(null, file);
    }
  };
  return stream;
};
