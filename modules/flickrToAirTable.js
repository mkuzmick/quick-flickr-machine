var moment = require('moment');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var color = require('./color');
var flickrTools = require('./flickrTools.js');
var airtableTools = require('./airtableTools.js');

async function flickrToAirTable(settings){
  console.log("in flickrToAirTable with settings: " + JSON.stringify(settings, null, 4));
  var pageCount = await flickrTools.getPageCount(settings);
  console.log('going to loop through ' + pageCount + ' pages.');
  for (var i = 1274; i < pageCount; i++) {
    var thePhotos = await flickrTools.getPhotos([i], settings);
    var theInfoPhotos = await flickrTools.addInfo(thePhotos);
    // writeJson(theInfoPhotos, ('theInfoPhotos-' + ("000000" + i).slice(-6)));
    var thePhotosWithSizes = await flickrTools.addSizes(theInfoPhotos);
    // writeJson(thePhotosWithSizes, ('thePhotosWithSizes-' + ("000000" + i).slice(-6)));
    var thePhotosWithExif = await flickrTools.addExif(thePhotosWithSizes);
    writeJson(thePhotosWithExif, ('thePhotosWithExif-' + ("000000" + i).slice(-6)));
    console.log("so now we have what we need to populate Airtable");
    await airtableTools.arrayToAirtable(thePhotosWithExif, "flickr_stills");
  }
  console.log("done flickrToAirTable");
  return "returning flickrToAirTable complete";
}

function writeJson (obj, name) {
  fs.writeFileSync(
    path.join(process.env.JSON_OUTPUT_PATH, name),
    JSON.stringify(obj, null, 4), 'utf-8'
  );
  console.log("saved " + name + " at " + moment().format('x'));
}

module.exports.f2at = flickrToAirTable;
