'use strict';
const gulp = require( 'gulp' ),
      del = require( 'del' ),
      reload = require( 'browser-sync' ).reload,
      browserSync = require( 'browser-sync' ).create(),
      critical = require( 'critical' ).stream,
      htmlmin = require( 'gulp-htmlmin' ),
      cleanCSS = require( 'gulp-clean-css' ),
      imagemin = require('gulp-imagemin'),
      Hexo = require( 'hexo' ),
      hexo = new Hexo( process.cwd(), {});

const watchFiles = [
        './themes/alpha/**/*.*',
        './source/**/*.*'
      ],
      distDirectory = './public/';
      
gulp.task( 'clean', () => {
  return del( [ distDirectory ] );
});

gulp.task( 'init', ( callback ) => {
  const errorHandler = ( error ) => {
    console.error( error );
    hexo.exit();
  };
  hexo.init()
  .then( () => {
    callback();
  })
  .catch( errorHandler );
});

gulp.task( 'generate', [ 'init', 'clean' ], ( callback ) => {
  hexo.call( 'generate', { watch: false })
    .then( () => {
      callback();
    })
    .catch( ( error ) => {
      hexo.exit();
      console.error( error );
    });
});

gulp.task( 'generate:watch', [ 'init', 'clean' ], ( callback ) => {
  hexo.call( 'generate', { watch: true })
    .then( () => {
      callback()
    })
    .catch( ( error ) => {
      console.error( error );
      hexo.exit();
    });
});

gulp.task( 'html', [ 'generate' ], () => {
  return gulp
    .src( distDirectory +'**/*.html' )
    .pipe( critical({
        base: distDirectory,
        inline: true
      }) )
    .pipe( htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    }) )
    .pipe( gulp.dest( distDirectory ) );
});

gulp.task( 'css', [ 'generate' ], () => {
  return gulp
    .src( distDirectory + 'css/**/*.css' )
    .pipe( cleanCSS({
      debug: true
    }) )
    .pipe( gulp.dest( distDirectory + 'css/' ) )
});

gulp.task( 'images', [ 'generate' ], () => {
  return gulp
    .src( distDirectory + '**/*' )
    .pipe( imagemin({
      optimizationLevel: 7,
      progressive: true,
      multipass: true,
      interlaced: true,
    }) )
    .pipe( gulp.dest( distDirectory ) );
});

gulp.task( 'build', [ 'html', 'css', 'images' ], ( ) => {
  console.log( 'Blog successfully built.');
});

gulp.task( 'serve', [ 'generate:watch' ], () => {
  browserSync.init({
    server: {
      baseDir: distDirectory
    },
    logLevel: 'debug'
  });
  hexo.on( 'generateAfter', () => {
    setTimeout( browserSync.reload, 0 );
  });
});

gulp.task( 'serve:dist', [ 'build' ], () => {
  browserSync.init({
    server: {
      baseDir: distDirectory
    },
    logLevel: 'debug'
  });
  hexo.on( 'generateAfter', () => {
    setTimeout( browserSync.reload, 0 );
  });
});

gulp.task( 'default', [ 'serve' ]);
