global.__basedir = __dirname;
require('dotenv').config();

// var mongoose = require('mongoose');
// const _ = require('lodash');
const f2at = require("./modules/flickrToAirTable").f2at;
// const slackTools = require("./modules/slack-tools");
// var db = mongoose.connection;


async function run (settings){
  var f2atOutput = await f2at(settings);
  console.log("got the f2at output: \n");
  console.log(JSON.stringify(f2atOutput, null, 4));
  return f2atOutput;
}

module.exports.run = run;
