var gulp = require("gulp");
var mocha = require("gulp-mocha");
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

/**
 * Set test env
 */
gulp.task('set-env', function () {
	env({
		file: "env/test-env.json"
	});
});

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
gulp.task('run-app', function(){
    nodemon({
        script: './bin/www',
        ext: 'js',
        env: {
            MAX_STORIES:10,
            NODE_ENV: "development",
            PORT:8000,
            MONGO_CONNECTION_STRING:"mongodb://localhost/test"
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

gulp.task('default', ['set-env', 'run-app'])
gulp.task('test', ['set-env', 'run-tests'])
