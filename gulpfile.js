var gulp = require("gulp");
var mocha = require("gulp-mocha");
var nodemon = require('gulp-nodemon');

/**
 * Execute all tests.
 */
gulp.task("run-tests", function() {
  return gulp.src("test/**/*.js", {read: false})
    .pipe(mocha({reporter: "spec"}));
});

/**
 * Run the API in a loop, restart when files change
 */
gulp.task('default', function(){
    nodemon({
        script: './bin/www',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});
