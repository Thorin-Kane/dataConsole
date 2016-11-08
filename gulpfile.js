var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gchange = require('gulp-change'),
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
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    tap = require('gulp-tap');

var paths = {
    dev: {
        root: 'dev',
        less: 'dev/style',
        js: 'dev/js',
    },
    dist: 'dist',
    lessFile: 'app.less',
    jsFile: 'index.js',
    indexFile: 'index.ejs'
}

var Bundler = function bundle () {

        this.bundle = function () {
            var _this = this;

            gutil.log(gutil.colors.blue('>> js bundling...'));

            return gulp.src(paths.dev.js + '/' + paths.jsFile, {read: false})
                .pipe(plumber())
                .pipe(tap(function (file) {
                    var d = require('domain').create()

                    d.on('error', function (err) {
                        gutil.beep();
                        gutil.log(gutil.colors.red("Browserify compile error:"), err.message, "\n\t", gutil.colors.cyan("in file"), file.path);
                        //this.emit('end');
                    });
                    d.run(function () {
                        file.contents = browserify({
                            entries: [file.path]
                        })
                        .transform(babelify, {presets: ['es2015', 'babel-preset-stage-0', 'react']})
                        .transform(requireGlobify)
                        .bundle()
                        .pipe(source('app-bundled.js'))
                        .pipe(buffer())
                        .pipe(minify())
                        .pipe(gulp.dest(paths.dist))
                        .pipe(livereload())
                        .on('end', function () {
                            _this.onEnd.call();
                            gutil.log(gutil.colors.green('>> js bundled'));
                        });
                    });
                }));
        };

        this.onEnd = function () {
            // Noop
        };

        this.promise = function () {
            var bundler = new Bundler();
                deferred = q.defer();

            bundler.onEnd = function () {
                deferred.resolve();
            };

            bundler.bundle();

            return deferred.promise;
        };
    },
    empty = function (dir) {
        var deferred = q.defer();

        try {
            exec('rm -r ' + __dirname + '/' + dir + '/*', function (err, stdout, stderr) {
                if (err) {
                    gutil.log(err);
                }
                gutil.log(gutil.colors.green('>> /dist cleaned'));
                deferred.resolve();
            });
        } catch (err) {
            gutil.log('MyError:', err);
        }

        return deferred.promise;
    },
    move =  function () {
        var deferred = q.defer(),
            copy = function (dir) {
                var rDef = q.defer();
                console.log(paths.dev.root + '/' + dir, paths.dist + '/' + dir);
                ncp(paths.dev.root + '/' + dir, paths.dist + '/' + dir, function (err) {
                    if (err) {
                        gutil.log('copy error: ', err);
                        rDef.reject();
                        return;
                    }
                    rDef.resolve();
                });
                return rDef.promise;
            };

        copy('resources')
            .then(function () {
                gutil.log(gutil.colors.green('>> resources copied'));
                deferred.resolve();
            });

        return deferred.promise;
    },
    compile = function () {
        var deferred = q.defer();

        gutil.log(gutil.colors.blue('>> less compiling...'));
        gulp.src(paths.dev.less + '/' + paths.lessFile)
            .pipe(plumber({
                errorHandler: function (err) {
                    gutil.beep();
                    this.emit('end')
                }
            }))
            .pipe(gless())
            .pipe(gulp.dest(paths.dist))
            .pipe(livereload())
            .on('error', function (err) {
                gutil.log('Error compiling less:', err);
                deferred.reject();
            })
            .on('end', function () {
                gutil.log(gutil.colors.green('>> less compiled'));
                deferred.resolve();
            });

        return deferred.promise;
    },
    changeContent = function () {
        var deferred = q.defer(),
            perform = function (content) {
                gutil.log(content);
                return content.replace(/app-bundled.js/, 'app-bundled-min.js').replace('<script src="http://localhost:35729/livereload.js?snipver=1"></script>', '');
            };

        gulp.src(paths.indexFile)
            .pipe(gchange(perform))
            .pipe(gulp.dest(paths.dist))
            .on('end', function () {
                deferred.resolve();
            })
            .on('error', function () {
                deferred.reject();
            });

        return deferred.promise;
    };

//////////////////////
// TASKS
//////////////////////
gulp.task('compile', compile);
gulp.task('bundle', function () {
    var bundler = new Bundler();

    return bundler.bundle();
});
gulp.task('move', move);
gulp.task('watch-less', ['compile'], function () {
    livereload.listen();
    return gulp.watch(paths.dev.less + '/**/*.less', ['compile']);
});
gulp.task('watch-js', ['bundle'], function () {
    livereload.listen();
    return gulp.watch(paths.dev.js + '/**/*.js', ['bundle']);
});

gulp.task('watch', ['watch-less', 'watch-js']);

gulp.task('serve', function () {
    return nodemon({
        script: 'schema_server.js',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: [paths.dist, paths.dev.root]
    });
});

gulp.task('dev', ['serve', 'watch']);

gulp.task('dist', function () {
    var bundler = new Bundler();

    return empty('src')
        .then(move)
        .then(bundler.promise)
        .then(compile)
        .then(changeContent)
        .then(function () {
            exec('rm -r src/app-bundled.js', function (e, out, err) {
                if (e) {
                    gutil.log(e);
                    return;
                }
            });
        });
});

gulp.task('default', function () {
    var bundler = new Bundler();

    return empty('src')
        .then(move)
        .then(bundler.promise)
        .then(compile);
});
