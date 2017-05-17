'use strict'
const gulp = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const Hexo = require('hexo')
const hexo = new Hexo(process.cwd(), {})

const distDirectory = './public/'

gulp.task('clean', () => {
  return del([distDirectory, 'db.json', '.deploy_git'])
})

gulp.task('init', (callback) => {
  hexo.init()
  .then(() => {
    callback()
  })
  .catch((error) => {
    console.error(error)
    hexo.exit()
  })
})

gulp.task('generate', ['init', 'clean'], (callback) => {
  hexo.call('generate', {watch: false})
    .then(() => {
      callback()
    })
    .catch((error) => {
      hexo.exit()
      console.error(error)
    })
})

gulp.task('generate:watch', ['init', 'clean'], (callback) => {
  hexo.call('generate', {watch: true})
    .then(() => {
      callback()
    })
    .catch((error) => {
      console.error(error)
      hexo.exit()
    })
})

gulp.task('html', ['generate'], () => {
  return gulp
    .src(distDirectory + '**/*.html')
    // .pipe(critical({
    //     base: distDirectory,
    //     inline: true
    //   }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest(distDirectory))
})

gulp.task('css', ['generate'], () => {
  return gulp
    .src(distDirectory + 'css/**/*.css')
    .pipe(cleanCSS({
      debug: true
    }))
    .pipe(gulp.dest(distDirectory + 'css/'))
})

gulp.task('images', ['generate'], () => {
  return gulp
    .src(distDirectory + '**/*')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(distDirectory))
})

gulp.task('build', ['html', 'css', 'images'], () => {
  console.log('Blog successfully built.')
})

gulp.task('serve', ['generate:watch'], () => {
  browserSync.init({
    port: 4001,
    open: false,
    server: {
      baseDir: distDirectory
    },
    logLevel: 'debug'
  })
  hexo.on('generateAfter', () => {
    setTimeout(browserSync.reload, 0)
  })
})

gulp.task('serve:dist', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: distDirectory
    },
    logLevel: 'debug'
  })
  hexo.on('generateAfter', () => {
    setTimeout(browserSync.reload, 0)
  })
})

gulp.task('default', ['serve'])
