var utils = require("utils");
var hogan = require("hogan.js");

var templates = {

  compile: function(files, cb) {
    process.nextTick(function() {
      var templates = files.map(function(file) {
        return {filename: file.filename, template: hogan.compile(file.content)};
      });
      cb(null, templates);
    });
  },

  name: function(filename) {
    var parts = filename.split("/");
    var file = parts[parts.length - 1];
    parts = file.split(".");
    return parts[0];
  }

};

module.exports = templates;
