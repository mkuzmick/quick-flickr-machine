var Flickr = require('flickr-sdk');
var flickr = new Flickr(process.env.FLICKR_API_KEY);
var chalk = require('chalk');

async function flickrToAirTable(settings){
  console.log("in flickrToAirTable with settings: " + JSON.stringify(settings, null, 4));
  // getPhotos(settings).then(res=>{
  //   getInfo(res)
  //     .then(theInfo=>{
  //       console.log("here's the info: \n" + JSON.stringify(theInfo));
  //     })
  // });
  var thePhotos = await getPhotos(settings);
  var theInfo = await getInfo(thePhotos);
  var theSizes = await getSizes(thePhotos);
  var theExif = await getExif(thePhotos);
  console.log(chalk.cyan(JSON.stringify(theInfo)));
  console.log(chalk.yellow(JSON.stringify(theExif)));
  console.log(chalk.red(JSON.stringify(theSizes)));
  console.log("done?");
  return "maybe complete"
}

async function getPhotos(settings){
  var result = await flickr.people.getPublicPhotos({
    user_id: settings.userId,
    per_page: 50
  }).then(function(res){
    console.log('yay!', JSON.stringify(res.body, null, 4));
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
    info.push(infoResult);
  }
  console.log("done finding info");
  return info;
}

async function getSizes(photos){
  console.log("starting getSizes");
  var sizes = [];
  for (var i = 0; i < photos.length; i++) {
    console.log("looking for " + photos[i].title + " sizes");
    var sizesResult = await flickr.photos.getSizes({
      photo_id: photos[i].id
    });
    sizes.push(sizesResult);
  }
  console.log("done finding sizes");
  return sizes;
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

module.exports.f2at = flickrToAirTable;

//
//
// res.body.photos.photo.forEach(photo=>{
//   console.log("photo: " + photo.title);
//   flickr.photos.getInfo({
//     photo_id: photo.id
//   }).then(function (res) {
//     console.log("got the getInfo back for " + photo.title + ":");
//     console.log(JSON.stringify(res.body, null, 4));
//   }).catch(function(err) {
//     console.error('bonk', err);
//   });
//   flickr.photos.getExif({
//     photo_id: photo.id
//   }).then(function (res) {
//     console.log("got the getExif back for " + photo.title + ":");
//     console.log(JSON.stringify(res.body));
//   }).catch(function(err) {
//     console.error('bonk', err);
//   });
//   flickr.photos.getSizes({
//     photo_id: photo.id
//   }).then(function (res) {
//     console.log("got the getSizes back for " + photo.title + ":");
//     console.log(JSON.stringify(res.body, null, 4));
//   }).catch(function(err) {
//     console.error('bonk', err);
//   });
// });
