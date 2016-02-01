var gulp = require('gulp');


gulp.task('inject',function(){
        var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
        
    };
    var inject = require('gulp-inject');
        var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'],{ read : false});
      var injectOptions = {
        ignorePath : '/public/'
    };
 return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc ,  injectOptions))
    .pipe(gulp.dest('./src/views'));
});