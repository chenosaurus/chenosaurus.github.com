var Showdown = require("showdown");
var utils = require("./lib/utils.js");
var templates = require("./lib/templates.js");
var async = require("async");

var config = {};

var converter = new Showdown.converter();

var html = converter.makeHtml('#hello markdown!');

//console.log(html)

utils.md5("./config.json", function(err, md5) {
  if (err) {
    console.log(err);
  } else {
    console.log(md5);
  }
});

utils.readJSON("./config.json", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//function configLoadSuccess(cfg) {
 // config = cfg;
 // console.log(config);
 // utils.ls(__dirname + config.files.articles, console.log, console.log)
//}

 async.series([
   function(cb) {
     console.log('here');
     cb(null, 'blah');
   },
   function(cb) {
     console.log('here 2');
     cb(null, 'blah2');
   }
],
function(err, res) {
  console.log(res);
});

async.waterfall([
  function(cb) {
    utils.ls("./templates", cb);
  },
  function(filenames, cb) {
    utils.readMulti(filenames, cb);
  },
  function(files, cb) {
    templates.compile(files, cb);
  }
  //  utils.readMulti
], function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});



