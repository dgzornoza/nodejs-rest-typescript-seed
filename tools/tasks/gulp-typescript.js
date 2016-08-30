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
    return build(tsProject, true);
});

/**
 * lint and build TypeScript in release mode
 */
gulp.task("build-ts-release", ["lint-ts"], function () {
    return build(tsProject, false);
});

/**
 * lint typescript source code
 */
gulp.task("lint-ts", function () {
    return lint(tasksConfig.sourceScriptFiles);
});



function build(tsBuildProject, generateSourceMaps)
{
    // compile typescript
    var tsResult = tsBuildProject.src();

    if (generateSourceMaps) {
        tsResult = tsResult.pipe(sourcemaps.init());
    }
    
    tsResult = tsResult.pipe(tsc(tsBuildProject));

    // send javascript to output folder
    var js = tsResult.js;

    if (generateSourceMaps) {
        js = js.pipe(sourcemaps.write(".", 
        { 
            includeContent: false, 
            sourceRoot: function(file) {                
                var relativePathsCount = file.sourceMap.file.split('/').length -1;
                return "../" + "../".repeat(relativePathsCount) + "src/";
            }
        }));
    }

    js = js.pipe(gulp.dest(tasksConfig.outputFolder));

    return js;
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





