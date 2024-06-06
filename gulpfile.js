const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = () => import('gulp-imagemin').then(module => module.default); 

async function comprimeImages() {
    const imageminModule = await imagemin(); 
    return gulp.src('./source/images/*')
        .pipe(imageminModule())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavascript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify()) 
        .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'));
}

exports.image = comprimeImages;
exports.sass = compilaSass;
exports.javascript = comprimeJavascript; 

exports.default = gulp.series(compilaSass, comprimeJavascript, comprimeImages);

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, compilaSass);
};
