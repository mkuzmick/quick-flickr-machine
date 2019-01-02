var flickrTools = require('./flickrTools.js');
var Airtable = require('airtable');
var chalk = require('chalk');
var color = require('./color');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);


async function arrayToAirtable (array, table) {
  for (var i = 0; i < array.length; i++) {
    var theSizes = "";
    var largeUrl = "";
    var mediumUrl = "";
    var squareUrl = "";
    var shutter_speed = "NA";
    var aperture = "NA";
    var exposure_mode = "NA";
    var theIso = "NA"
    var exif_create_date = "NA";
    var focal_length = "NA";
    var wb_mode = "NA";
    var lens_model = "NA";
    var lens_serial = "NA";
    var approximate_focus_distance = "NA";
    for (var j = 0; j < array[i].sizes.length; j++) {
      theSizes+=((array[i].sizes[j].label) + ": " + array[i].sizes[j].source + "\n");
      if (array[i].sizes[j].label == "Large") {
        largeUrl = array[i].sizes[j].source;
      }
      if (array[i].sizes[j].label == "Medium") {
        mediumUrl = array[i].sizes[j].source;
      }
      if (array[i].sizes[j].label == "Large Square") {
        squareUrl = array[i].sizes[j].source;
      }
    }
    for (var k = 0; k < array[i].exif.photo.exif.length; k++) {
      if (array[i].exif.photo.exif[k].tag == "ExposureTime") {
        shutter_speed = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "FNumber") {
        aperture = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "ExposureProgram") {
        exposure_mode = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "ISO") {
        theIso = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "CreateDate") {
        exif_create_date = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "FocalLength") {
        focal_length = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "WhiteBalance") {
        wb_mode = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "LensModel") {
        lens_model = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "LensSerialNumber") {
        lens_serial = array[i].exif.photo.exif[k].raw._content
      }
      if (array[i].exif.photo.exif[k].tag == "ApproximateFocusDistance") {
        approximate_focus_distance = array[i].exif.photo.exif[k].raw._content
      }
    }
    var theRecord = {
      "flickr_id": array[i].id,
      "Notes": "none yet.",
      "title": array[i].title,
      "server": array[i].server,
      "farm": array[i].farm.toString(),
      "date_uploaded": array[i].info.dateuploaded,
      "original_format": array[i].info.originalformat,
      "date_posted": array[i].info.dates.posted,
      "date_taken": array[i].info.dates.taken,
      "views": array[i].info.views,
      "flickr_data_date": moment().format('x'),
      "flickr_photo_page": array[i].info.urls.url[0]._content,
      "sizes": theSizes,
      "large_url": largeUrl,
      "medium_url": mediumUrl,
      "large_square_url": squareUrl,
      "camera": (array[i].exif.photo.camera ? array[i].exif.photo.camera : "NA"),
      "shutter_speed": shutter_speed,
      "aperture": aperture,
      "exposure_mode": exposure_mode,
      "ISO": theIso,
      "exif_create_date": exif_create_date,
      "focal_length": focal_length,
      "wb_mode": wb_mode,
      "lens_model": lens_model,
      "lens_serial": lens_serial,
      "approximate_focus_distance": approximate_focus_distance,
      "flickr_secret": array[i].secret,
      "flickr_owner": array[i].owner
    }
    await toAirtable(theRecord, table);
  }
}

// TODO: if this is going to work we need to handle a variety of different row types.
function toAirtable (record, table) {
  return new Promise(resolve => {
    base(table).create(record, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.getId());
        resolve(record.getId());
    });
  });
}

module.exports.arrayToAirtable = arrayToAirtable;
