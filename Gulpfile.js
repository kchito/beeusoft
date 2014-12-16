var gulp               = require( 'gulp' ),
    connect            = require( 'gulp-connect' ),
    historyApiFallback = require( 'connect-history-api-fallback' ),
    jshint             = require( 'gulp-jshint' ),
    less               = require( 'gulp-less' ),
    nib                = require( 'nib' ),
    path               = require( 'path' ),
    stylish            = require( 'jshint-stylish' ),
    stylus             = require( 'gulp-stylus' );

// Servidor web de desarrollo
gulp.task( 'server', function() {
    connect.server({
        root       : './app',
        hostname   : '0.0.0.0',
        port       : 8080,
        livereload : true,
        middleware : function( connect, opt ) {
            return [ historyApiFallback ];
        }
    });
});
// Compila less
gulp.task( 'less', function(){
    gulp.src('./app/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe( connect.reload() );
});
// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task( 'css', function() {
    gulp.src( './app/stylesheets/*.styl' )
    .pipe( stylus( { use: nib() } ) )
    .pipe( gulp.dest( './app/stylesheets' ) )
    .pipe( connect.reload() );
});
// Recarga el navegador cuando hay cambios en el HTML
gulp.task( 'html', function() {
    gulp.src( './app/**/*.html' )
    .pipe( connect.reload() );
});
// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task( 'watch', function() {
    gulp.watch( [ './app/**/*.html' ], [ 'html' ] );
    gulp.watch( [ './app/stylesheets/**/*.styl' ], [ 'css' ] );
    gulp.watch( [ './app/**/*.less' ], [ 'less' ] );
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task( 'jshint', function() {
    return gulp.src( './app/scripts/*/.js' )
    .pipe(jshint('.jshintrc')) .pipe(jshint.reporter('jshint-stylish')) .pipe(jshint.reporter('fail'));
});

gulp.task( 'default', [ 'server', 'watch', 'html', 'css', 'less' ] );

