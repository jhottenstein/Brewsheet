var SUPPORTED_BROWSERS = [
    "Chrome 17.0"
];

desc("Just test for now");
task("default", ["test"]);

desc("Run the testacular tests");
//task("test", function (
desc("Start Testacular server for testing");
task("testacular", function() {
    testacular(["start", "config/testacular.conf.js"], "Could not start Testacular server", complete);
    }, {async: true});

desc("Test client code");
task("test", function() {
    var config = {};

    var output = "";
    var oldStdout = process.stdout.write;
    process.stdout.write = function(data) {
    output += data;
    oldStdout.apply(this, arguments);
    };

    require("testacular/lib/runner").run(config, function(exitCode) {
      process.stdout.write = oldStdout;

      if (exitCode) fail("Client tests failed (to start server, run 'jake testacular')");
      var browserMissing = false;
      SUPPORTED_BROWSERS.forEach(function(browser) {
        browserMissing = checkIfBrowserTested(browser, output) || browserMissing;
        });
      if (browserMissing && !process.env.loose) fail("Did not test all supported browsers (use 'loose=true' to suppress error)");
      if (output.indexOf("TOTAL: 0 SUCCESS") !== -1) fail("Client tests did not run!");

      complete();
      });
}, {async: true});

function testacular(args, errorMessage, callback) {
  args.unshift("node_modules/testacular/bin/testacular");
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
