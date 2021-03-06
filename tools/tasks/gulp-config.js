// -----------------------------------------------
// Configuration file for gulp tasks
'use strict';

var gulp = require("gulp");
var template = require('gulp-template');
var debug = require('gulp-debug');

/**
 * configure for debug environment
 */
gulp.task("configure-debug", ["build-ts-debug"], function () {
    return configure(tasksConfig.environmentVars.debug);
});

/**
 * configure for debug environment
 */
gulp.task("configure-release", ["build-ts-release"], function () {
    return configure(tasksConfig.environmentVars.release);
});

function configure(obj)
{
    var files = [
        tasksConfig.outputAppFolder + "config.js",
        tasksConfig.outputAppFolder + "main.js"
        ]

    gulp.src(files)
		.pipe(template(obj))
		.pipe(gulp.dest(tasksConfig.outputAppFolder));
}



var tasksConfig = (function ()
{
    var _sourceFolder = "src/";
    var _sourceContentFolder = _sourceFolder + "content/";
    var _outputFolder = "wwwroot/";
    var _outputContentFolder = _outputFolder + "content/";

    return {

        // source resources
        sourceFolder: _sourceFolder,

        sourceMocksFiles: _sourceContentFolder + "mocks/*.json",
        sourceScriptFiles: _sourceFolder + "app/**/*.ts",

        // output resources
        outputFolder: _outputFolder,
        outputContentFolder: _outputContentFolder,

        outputAppFolder: _outputFolder + "app/",
        outputLibFolder: _outputFolder + "lib/",
        outputMocksFolder: _outputContentFolder + "mocks/",

        // environments vars for use with gulp-template
        environmentVars: {

            debug: {
	            SOURCE_FOLDER: _outputFolder + "app/",
                SERVER_PORT: "5000",
                APP_NAME: "nodejs.ts.sample",
                DEBUG_MODE: "true",
                MINIFIED_EXT: ".min"
            },
            release: {
	            SOURCE_FOLDER: "./app/",
                SERVER_PORT: "5000",
                APP_NAME: "nodejs.ts.sample",
                DEBUG_MODE: "false",
                MINIFIED_EXT: ""
            }

        }

    };

})();

module.exports = tasksConfig;
