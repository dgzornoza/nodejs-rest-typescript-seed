'use strict';
var gulp = require("gulp");
var debug = require("gulp-debug");
var del = require("del");

// Custom tasks modules
var tasksConfig = require("./tools/tasks/gulp-config");
require("./tools/tasks/gulp-typescript");
require("./tools/tasks/gulp-mocks");



/**
 * Build all project in output directory in debug  mode
 */
gulp.task("build-debug", ["build-ts-debug", "build-mocks", "configure-debug"]);

/**
 * Build all project in output directory in release mode
 */
gulp.task("build-release", ["build-ts-release", "build-mocks", "configure-release"]);


/**
 * watch source files (only for debug environment)
 */
gulp.task("watch-source", function() {
        gulp.watch([tasksConfig.sourceScriptFiles], ["build-ts-debug", "configure-debug"]);
});

/**
 * clean output files
 */
gulp.task("clean-output", function() {

    // delete output
    del.sync([
        tasksConfig.outputAppFolder,
        tasksConfig.outputLibFolder,
        tasksConfig.outputContentFolder
        ]);
});
