// -----------------------------------------------
// Task for lint and compile typescript
'use strict';

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");

var tasksConfig = require("./gulp-config");


// configure typescript for use tsconfig.json
var tsProject = tsc.createProject("src/app/tsconfig.json", { typescript: require("typescript") });


/**
 * lint and build TypeScript in debug mode
 */
gulp.task("build-ts-debug", ["lint-ts"], function () {
    return build(tsProject);
});

/**
 * lint and build TypeScript in debug mode
 */
gulp.task("build-ts-relase", ["lint-ts"], function () {
    return build(tsProject);
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {
    return lint(tasksConfig.sourceScriptFiles);
});



function build(tsBuildProject)
{
    // compile typescript
    var tsResult = tsBuildProject.src()
    .pipe(sourcemaps.init()) 
    .pipe(tsc(tsBuildProject));
    // send javascript to output folder
    return tsResult.js
    .pipe(sourcemaps.write(".", {sourceRoot: "../../src/"}))
    .pipe(gulp.dest(tasksConfig.outputFolder));
};


function lint(source)
{
    return gulp.src(source)
    .pipe(tslint())
    .pipe(tslint.report("prose",
    {
        emitError: false,
        summarizeFailureOutput: true
    }));
};





