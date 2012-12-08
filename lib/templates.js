var utils = require("./utils");
var hogan = require("hogan.js");

var templates = {

  compile: function(files, cb) {
    process.nextTick(function() {
      var tpls = files.map(function(file) {
        return {name: templates.name(file.filename), template: hogan.compile(file.content)};
      });
      cb(null, tpls);
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
