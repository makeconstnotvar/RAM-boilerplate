const path = require('path');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean-css');
//const autoprefixer = require('gulp-autoprefixer');
const hash = require('gulp-hash');
const inject = require('gulp-inject');
const del = require('del');
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const apps = ['admin', 'manager', 'secure', 'ram'];

/* Копирование */
apps.forEach(app => {
    gulp.task(`copy-${app}`, function () {
        return gulp.src(['public/**/*', '!public/index.html', '!public/ie.html'])
            .pipe(gulp.dest(`build/${app}`));
    });
});

apps.forEach(app => {
    gulp.task(`common-${app}`, function () {
        return gulp.src(['build/scripts/*']).pipe(gulp.dest(`build/${app}/scripts`));
    });
});

apps.forEach(app => {
    gulp.task(`inject-${app}`, function () {
        const sources = gulp.src([`build/${app}/scripts/*.js`, `build/${app}/styles/*.css`,], {read: false});

        return gulp.src(['public/index.html', 'public/ie.html'])
            .pipe(inject(sources, {ignorePath: '/build'}))
            .pipe(gulp.dest(`build/${app}`));
    });
});

/* Стили */
//const styles = ['src/styles/styles.scss'];
const styles = ['src/index.css', 'src/ram/components/*.css'];

gulp.task('styles-release', function () {
    return gulp.src(styles)
        .pipe(sourcemaps.init(undefined))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(hash())
        .pipe(clean())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/admin/styles'))
        .pipe(gulp.dest('build/manager/styles'))
        .pipe(gulp.dest('build/secure/styles'))
        .pipe(gulp.dest('build/ram/styles'));
});

gulp.task('styles-debug', function () {
    return gulp.src(styles)
        .pipe(sourcemaps.init())
        .pipe(postcss([tailwindcss()]))
        .pipe(clean())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/admin/styles'))
        .pipe(gulp.dest('build/manager/styles'))
        .pipe(gulp.dest('build/secure/styles'))
        .pipe(gulp.dest('build/ram/styles'));
});

gulp.task('styles-delete', function () {
    return del(['build/**/*.css', 'build/**/*.css.map']);
});

/* Основные таски */
gulp.task('debug', gulp.series(
    'styles-debug',
    'copy-admin',
    'copy-manager',
    'copy-secure',
    'copy-ram',
    'common-admin',
    'common-manager',
    'common-secure',
    'common-ram',
    'inject-admin',
    'inject-manager',
    'inject-secure',
    'inject-ram',
));

gulp.task('release', gulp.series(
    'styles-release',
    'copy-admin',
    'copy-manager',
    'copy-secure',
    'copy-ram',
    'common-admin',
    'common-manager',
    'common-secure',
    'common-ram',
    'inject-admin',
    'inject-manager',
    'inject-secure',
    'inject-ram',
));

gulp.task('watch', gulp.series('styles-delete', 'styles-debug', function () {
    return gulp.watch(['src/styles/**/*.css'], gulp.series('styles-debug'));
}));

gulp.task('clean', function () {
    return del(['build/*/']);
});

function tildaResolver(url, prev, done) {
    if (url[0] === '~') {
        url = path.resolve('node_modules', url.substr(1));
    }

    return {file: url};
}

