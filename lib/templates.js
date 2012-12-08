var utils = require("utils");
var hogan = require("hogan.js");

var templates = {
  compile: function(filename, cb) {
    utils.read(filename, function(err, data) {
      if (err) {
        cb(err);
      } else {
        var compiled = hogan.compile(data.content);
        cb(null, {name: templates.name(filename), template: compiled});
      };
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
