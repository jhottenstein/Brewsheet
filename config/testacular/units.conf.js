basePath = '../../';

files = [
  'app/lib/angular/angular.js',
  'app/lib/angular/angular-*.js',
  'app/js/app.js',
  'app/js/**/*.js',
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/angular/angular-mocks.js',
  'test/unit/**/*.js'
];

autoWatch = false;

port = 9888;
runnerPort = 2600;

//browsers = ['Chrome'];

reporters = ['dots'];
