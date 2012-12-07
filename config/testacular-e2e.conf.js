basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

autoWatch = false;

//browsers = ['Chrome'];
runnerPort = 9110;

//singleRun = true;

proxies = {
  '/': 'http://localhost/~ohottenstein/brew/'
};

reporters = ['dots', 'junit'];
junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
