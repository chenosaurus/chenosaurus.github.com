var fs = require("fs");
var crypto = require("crypto");
var async = require("async");

var utils = {
  ls: function(dir, cb) {
    fs.readdir(dir, function(err, data) {
      if (err) {
        cb(err);
      } else {
        data = data.map(function(filename) {
          return dir + "/" + filename;
        });
        cb(null, data);
      }
    });
  },

  read: function(filename, cb) {
    fs.readFile(filename, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, {filename: filename, content: data.toString()});
      }
    });
  },

  readJSON: function(filename, cb) {
    this.read(filename, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, {filename: filename, json: JSON.parse(data.content)});
      }
    });
  },
  
  md5: function(data, cb) {
    process.nextTick(function() {
      var md5 = crypto.createHash("md5").update(data).digest("hex");
      cb(null, md5);
    });
  },

  md5File: function(filename, cb) {
    async.waterfall([
      function(cb) {
        utils.read(filename, cb);
      },
      function(data, cb) {
        utils.md5(data.content, function(err, md5) {
          if (err) {
            cb(err);
          } else {
            cb(null, {filename: filename, md5: md5});
          }
        });
      }
    ], cb);
  },

  md5Files: function(filenames, cb) {
    async.map(filenames, this.md5File, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },

  readMulti: function(filenames, cb) {
    async.map(filenames, this.read, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },

  readMultiJSON: function(filenames, cb) {
    async.map(filenames, this.readJSON, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
  }

};

module.exports = utils;
