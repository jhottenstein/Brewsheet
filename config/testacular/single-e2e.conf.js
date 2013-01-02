basePath = '../../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

autoWatch = false;

browsers = ['Chrome', 'Firefox', 'Safari'];

singleRun = true;

proxies = {
  '/': 'http://localhost/~ohottenstein/brew/'
};

reporters = ['dots'];
