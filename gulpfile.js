var gulp = require('gulp'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    requireGlobify = require('require-globify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    minify = require('gulp-minify'),
    gless = require('gulp-less'),
    ncp = require('ncp'),
    fs = require('fs'),
    exec = require('child_process').exec,
    q = require('q'),
    livereload = require('gulp-livereload'),
    nodemon=require('nodemon');

var bases = {
    dev: 'dev',
    dist: 'dist'
};

var bundle = function bundle () {
        var deferred = q.defer();

        console.log('>> js bundling...');
        browserify({
                entries: ['dev/static/js/index.js']
            })
            .transform(babelify, {presets: ['react']})
            .transform(requireGlobify)
            .bundle()
            .pipe(source('index-bundled.js'))
            .pipe(buffer())
            .pipe(minify())
            .pipe(gulp.dest('dist/static/js'))
            .on('error', function (err) {
                console.log('Error bundling js:', err);
            })
            .on('end', function () {
                console.log('>> js bundled');
                exec('rm dist/static/js/index.js', function (err) {
                    if (err) {
                        console.log('Error removing unbundled index file:', err);
                        deferred.reject();
                        return;
                    }
                    deferred.resolve();
                });
            });

        return deferred.promise;
    },
    recreate = function (path) {
        var deferred = q.defer();
        exec('mkdir -p ' + path, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                return;
            }
            deferred.resolve();
            console.log('>> /dist recreated');
        });
        return deferred.promise;
    },
    move =  function () {
        var deferred = q.defer(),
            DEV = 'dev/',
            DIST = 'dist/',
            copy = function (dir) {
                var rDef = q.defer();
                ncp(DEV + dir, DIST + dir, function (err) {
                    if (err) {
                        console.log('copy error: ', err);
                        rDef.reject();
                        return;
                    }
                    rDef.resolve();
                });
                return rDef.promise;
            };

        copy('static')
            .then(function () {
                console.log('>> resources copied');
                exec('rm dist/static/style/*', function (err, stdout, stderr) {
                    if (err) {
                        console.log('error removing extraneous less files:', err);
                        deferred.reject();
                        return;
                    }
                    console.log('>> extraneous less files removed');
                    exec('rm -r dist/static/js/*/', function (err, stdout, stderr) {
                        if (err) {
                            console.log('error removing extraneous js files:', err);
                            deferred.reject();
                            return;
                        }
                        console.log('>> extraneous js files removed');
                        copy('index.ejs').then(function () {
                            console.log('>> index.ejs copied');
                            deferred.resolve();
                        });
                    });
                });
            });

        return deferred.promise;
    },
    compile = function () {
        var deferred = q.defer();

        console.log('>> less compiling...');
        gulp.src('dev/static/style/app.less')
            .pipe(gless())
            .pipe(gulp.dest('dist/static/style'))
            .pipe(livereload())
            .on('error', function (err) {
                console.log('Error compiling less:', err);
                deferred.reject();
            })
            .on('end', function () {
                console.log('>> less compiled');
                deferred.resolve();
            });

        return deferred.promise;
    };

//////////////////////
// TASKS
//////////////////////

gulp.task('compile', compile);
gulp.task('move', move);
gulp.task('watch-less', ['compile'], function () {
    livereload.listen();
    gulp.watch('dev/static/style/*.less', ['compile']);
});
gulp.task('watch-js', ['default'], function () {
    return gulp.watch('dev/static/js/**/*.js', ['default'])
});
gulp.task('start', function() {
    nodemon({
        script: 'schema_server.js',
        ext: 'js html ejs less'

    })
    .on('restart', function () {
        console.log('restarted!');
    })
});
gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean())
        .on('error', function (err) {
            console.log('error cleaning /dist: ', err)
        })
        .on('end', function () {
            console.log('>> /dist cleaned');
        });
});

gulp.task('recreate', recreate);

gulp.task('bundle', bundle);

// Does it all
gulp.task('default', ['clean'], function () {
    return recreate('dist')
        .then(move)
        .then(bundle)
        .then(compile);
});
