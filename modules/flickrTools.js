var Flickr = require('flickr-sdk');
var flickr = new Flickr(process.env.FLICKR_API_KEY);
var color = require('./color.js');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

async function getPageCount(settings){
  // var result = await flickr.people.getPublicPhotos({
  var result = await flickr.people.getPhotos({
    user_id: settings.userId,
    per_page: settings.perPage,
    page: 2
  }).then(function(res){
    console.log('got the pageCount, and it\'s ' + res.body.photos.pages + ' for ' + res.body.photos.perpage + ' photos per page.');
    console.log('there are ' + res.body.photos.total + ' total photos.');
    return res.body.photos.pages;
  }).catch(function (err) {
    console.error('bonk', err);
  });
  return result;
}

async function getPhotos(pageNumber, settings){
  // var result = await flickr.people.getPublicPhotos({
  var result = await flickr.people.getPhotos({
    user_id: settings.userId,
    per_page: settings.perPage,
    page: pageNumber
  }).then(function(res){
    console.log('yay! -- got page ' + pageNumber);
    // writeJson(res.body, ('theResponse-' + ("000000" + pageNumber).slice(-6)));
    return res.body.photos.photo;
  }).catch(function (err) {
    console.error('bonk', err);
  });
  return result;
}

async function getInfo(photos){
  console.log("starting getInfo");
  var info = [];
  for (var i = 0; i < photos.length; i++) {
    console.log("looking for " + photos[i].title + " info");
    var infoResult = await flickr.photos.getInfo({
      photo_id: photos[i].id
    });
    var parsedResult = JSON.parse(infoResult.text);
    console.log("parsedResult:\n");
    color.cyan1(JSON.stringify(parsedResult, null, 4));
    info.push(parsedResult);
  }
  console.log("done finding info");
  return info;
}

async function addInfo(photos){
  console.log("starting addInfo");
  var infoPhotos = [];
  for (var i = 0; i < photos.length; i++) {
    var infoResult = await flickr.photos.getInfo({
      photo_id: photos[i].id
    });
    var parsedResult = JSON.parse(infoResult.text);
    var newInfoPhoto = {
      ...photos[i],
      info: parsedResult.photo
    }
    infoPhotos.push(newInfoPhoto);
  }
  console.log("done finding info");
  return infoPhotos;
}

async function addSizes(photos){
  console.log("starting getSizes");
  var photosWithSizes = [];
  for (var i = 0; i < photos.length; i++) {
    console.log("looking for " + photos[i].title + " sizes");
    var sizesResult = await flickr.photos.getSizes({
      photo_id: photos[i].id
    });
    var parsedResult = JSON.parse(sizesResult.text)
    var photoWithSizeInfo = {
      ...photos[i],
      sizes: parsedResult.sizes.size
    }
    photosWithSizes.push(photoWithSizeInfo);
    // color.green(JSON.stringify(photoWithSizeInfo, null, 4));
  }
  console.log("done finding sizes");
  return photosWithSizes;
}

async function addExif(photos){
  console.log("starting addExif");
  var photosWithExif = [];
  for (var i = 0; i < photos.length; i++) {
    console.log("looking for " + photos[i].title + " exif");
    var exifResult = await flickr.photos.getExif({
      photo_id: photos[i].id
    });
    // color.magenta(JSON.stringify(exifResult, null, 4));
    var parsedResult = JSON.parse(exifResult.text)
    var photoWithExifInfo = {
      ...photos[i],
      exif: parsedResult
    }
    photosWithExif.push(photoWithExifInfo);
    // color.green(JSON.stringify(photoWithExifInfo, null, 4));
  }
  console.log("done finding exif");
  return photosWithExif;
}
async function getExif(photos){
  console.log("starting getExif");
  var exif = [];
  for (var i = 0; i < photos.length; i++) {
    console.log("looking for " + photos[i].title + " exif");
    var exifResult = await flickr.photos.getExif({
      photo_id: photos[i].id
    });
    exif.push(exifResult);
  }
  console.log("done finding exif");
  return exif;
}

function writeJson (obj, name) {
  fs.writeFileSync(
    path.join(process.env.JSON_OUTPUT_PATH, name),
    JSON.stringify(obj, null, 4), 'utf-8'
  );
  console.log("saved " + name + " at " + moment().format('x'));
}

module.exports.writeJson = writeJson;
module.exports.getExif = getExif;
module.exports.addExif = addExif;
module.exports.getPageCount = getPageCount;
module.exports.getPhotos = getPhotos;
module.exports.addSizes = addSizes;
module.exports.getInfo = getInfo;
module.exports.addInfo = addInfo;
