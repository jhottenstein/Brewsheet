basePath = '../../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

autoWatch = false;

port = 9898;
runnerPort = 2660;

//browsers = ['Chrome'];

proxies = {
  '/': 'http://localhost/~ohottenstein/brew/'
};

reporters = ['dots'];
