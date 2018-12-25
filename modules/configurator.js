var pkg = require('../package.json');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
const chalk = require('chalk');
var fs = require('fs');
var path = require("path");

exports.configure = function(yargs){
  var defaultSettings = {
    valid: true,
    html: true,
  }
  var settings = {...defaultSettings, ...conf.all, ...yargs};
  if (!settings.userId) {
    console.log("need to know the userId");
    settings.valid = false;
  }
  console.log("about to return settings");
  return settings;
}


exports.setDefaults = function(yargs){
  console.log("conf:");
  console.log(chalk.cyan(JSON.stringify(conf.all, null, 4)));
  console.log("yargs:");
  console.log(chalk.cyan(JSON.stringify(yargs, null, 4)));
  var settings = {...conf.all, ...yargs};
  if (yargs.outputDir) {
    conf.set('outputDir', yargs.outputDir)
  }
  if (yargs.userId) {
    conf.set('userId', yargs.userId)
  }
  console.log("Here are your current defaults.");
  console.log(chalk.cyan(JSON.stringify(conf.all, null, 4)));
  console.log("To change any of these, run print with the --settings flag along with --key=value args for anything you'd like to set");
}
