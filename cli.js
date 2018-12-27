#!/usr/bin/env node
global.__basedir = __dirname;
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
var pkg = require('./package.json');
var configurator = require('./modules/configurator');
var Configstore = require('configstore');
var conf = new Configstore(pkg.name);
var cp = require("child_process");
const moment = require('moment');

const f2at = require('./index.js');

var yargs = require('yargs')
  .alias('s', 'settings')
  .alias('f', 'fcpxml')
  .argv

clear();
console.log(
  chalk.bold.magenta(
    figlet.textSync('f2at', { horizontalLayout: 'full'})
  ) + '\n\n'
);

async function main(yargs) {
  // if (!conf.all) {
  //   console.log("looks like you don't have a config set up yet.  Try specifying at least your desired output directory by entering --config --outputDir=/path/to/dir");
  //   await configurator.setDefaults(yargs);
  //   process.exit();
  // }
  if (yargs.settings || yargs.config) {
    await configurator.setDefaults(yargs);
    process.exit();
  }
  var jobSettings = await configurator.configure(yargs);
  console.log("the settings for this job are now:\n\n" + chalk.blue(JSON.stringify(jobSettings, null, 4)) );
  if (jobSettings.valid) {
    var theResult = await f2at.run(jobSettings);
    console.log('done running f2at');
    console.log(JSON.stringify(theResult, null, 4));
    return theResult
  } else {
    console.log("unfortunately your job settings aren't valid--can you work on your configuration?");
    console.log("To run this script you need to set the following configuration variables (just once) using typical yargs syntax (`--property=value`):\n\t--ffmpegPath=/path/to/ffmpeg\n\t--outputDir='/path/to/outputDirectory'");
    console.log("Then, each time you run the script you'll need to supply a path to an fcpxml file:\n\t--fcpxml=/path/to/fcpxml\n\t");
    console.log("\nand you can specify some of the following things too:");
    console.log("\n\t--shootfolder=/path/to/your/media\n\t--html=true/false");
  }
}

var theStart = moment().format("x");

//
main(yargs)
  .then((result) => {
     console.log('done the main function' + JSON.stringify(result));
     var theEnd = moment().format("x");
     var theDuration = theEnd - theStart;
     console.log("it took " + theDuration + " milliseconds to run.");
     return result;
   })
   .then(res => {
     console.log("theStart is " + theStart);
     var theEnd = moment().format("x");
     console.log("theEnd is " + theEnd);
     var theDuration = theEnd - theStart;
     console.log("it took " + theDuration + " milliseconds to run.")
   });
