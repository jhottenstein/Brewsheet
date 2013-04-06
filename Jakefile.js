/*global desc, task, namespace, jake, fail, complete, console, process, require*/
(function() {
  "use strict";
  var SUPPORTED_BROWSERS = [
  ];

  desc("test and lint");
  task("default", ["test", "lint"]);

  var lint = require("./build/lint/lintRunner.js");
  task("lint", function() {
    var passed = lint.validateFileList(javascriptFiles(), lintOptions(), lintGlobals());
    if (!passed ) fail("Lint failed");
  });

  desc("Test client code");
  task("test", ["test:single-units", "test:single-e2e"]);

  namespace("test", function() {

    desc("Single run of all end to end tests");
    task("single-e2e", function() {
      karma(["start", "config/karma/single-e2e.conf.js"], "Failed", complete);
    }, {async: true});


    desc("Single run of all unit tests");
    task("single-units", function() {
      karma(["start", "config/karma/single-units.conf.js"], "Failed", complete);
    }, {async: true});

    //desc("Start Testacular server for unit testing");
    //task("start-e2e", function() {
    //  karma(["start", "config/karma-e2e.conf.js"], "Could not start Testacular e2e server", complete);
    //  }, {async: true});

    desc("Start Testacular servers for unit and e2e testing");
    task("start", ["start-units", "start-e2e"]);

    desc("Start Testacular server for e2e testing");
    task("start-e2e", function() {
      karma(["start", "config/karma/e2e.conf.js"], "Could not start Testacular e2e server", complete);
    });

    desc("Start Testacular server for unit testing");
    task("start-units", function() {
      karma(["start", "config/karma/units.conf.js"], "Could not start Testacular unit server", complete);
    });

    var runTests = function(config) {
      //var config = {"runnerPort": 9101 };
      //var config = {};

      var output = "";
      var oldStdout = process.stdout.write;
      process.stdout.write = function(data) {
        output += data;
        oldStdout.apply(this, arguments);
      };

      require("karma").runner.run(config, function(exitCode) {
        process.stdout.write = oldStdout;

        if (exitCode) fail("Client tests failed (to start server, run 'jake test:start')");
        var browserMissing = false;
        SUPPORTED_BROWSERS.forEach(function(browser) {
          browserMissing = checkIfBrowserTested(browser, output) || browserMissing;
        });
        if (browserMissing && !process.env.loose) fail("Did not test all supported browsers (use 'loose=true' to suppress error)");
        if (output.indexOf("TOTAL: 0 SUCCESS") !== -1) fail("Client tests did not run!");

        complete();
      });
    };
    
    var runUnitTests = function() {
      runTests({"runnerPort": 2600 });
    };
    var runE2ETests = function() {
      runTests({"runnerPort": 2660 });
    };

    desc("End to End test code");
    task("e2e", runE2ETests, {async: true});

    desc("Test client code");
    task("units", runUnitTests , {async: true});
  });

  function karma(args, errorMessage, callback) {
    args.unshift("node_modules/.bin/karma");
    sh("node", args, errorMessage, callback);
  }

  function sh(command, args, errorMessage, callback) {
    console.log("> " + command + " " + args.join(" "));

    // Not using jake.createExec as it adds extra line-feeds into output as of v0.3.7
    var child = require("child_process").spawn(command, args, { stdio: "pipe" });

    // redirect stdout
    var stdout = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function(chunk) {
      stdout += chunk;
      process.stdout.write(chunk);
    });

    // redirect stderr
    var stderr = "";
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", function(chunk) {
      stderr += chunk;
      process.stderr.write(chunk);
    });

    // handle process exit
    child.on("exit", function(exitCode) {
      if (exitCode !== 0) fail(errorMessage);
    });
    child.on("close", function() {      // 'close' event can happen after 'exit' event
      callback(stdout, stderr);
    });
  }

  function checkIfBrowserTested(browser, output) {
    var missing = output.indexOf(browser + ": Executed") === -1;
    if (missing) console.log(browser + " was not tested!");
    return missing;
  }

  function javascriptFiles() {
    var jsFiles = new jake.FileList();
    jsFiles.include("**/*.js");
    jsFiles.exclude("*/lib/**/*.js");
    jsFiles.exclude("scripts/web-server.js");

    jsFiles.exclude("node_modules");
    jsFiles.exclude("config/karma");
    return jsFiles.toArray();
  }

  function lintOptions() {
    var options = {
    //ENFORCING
      bitwise:true,
      camelcase: true,
      curly:false,
      eqeqeq:true,
      forin:true,
      immed:true,
      latedef:true,
      newcap:true,
      noarg:true,
      noempty:true,
      nonew:true,
      quotmark: true,
      regexp:true,
      undef:true,
      //unused:true,
      trailing:true,
    //RELAXING
      globalstrict:true,
    //ENVIRONMENTS
      browser:true
    };
    return options;
  }
  function lintGlobals() {
    var globals = {
      // jasmine globals
      describe: false,
      beforeEach: false,
      it: false,
      expect: false,
      inject: false,
      module: false,
      //angular e2e globals
      browser: false,
      input: false,
      element: false,
      //app globals
      angular: false,
      brewsheetApp: true
    };
    return globals;
  }


}());
