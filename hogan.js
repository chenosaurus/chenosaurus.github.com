var hogan = require("hogan.js");

var t1 = "Hi {{name}}!  {{>t2}}";
var t2 = "blah {{>t3}}";
var t3 = "some {{name}}";

var t1c = hogan.compile(t1);
var t2c = hogan.compile(t2);
var t3c = hogan.compile(t3);

var ctx = {"name": "dave"};
var partials = {"t2": t2c, "t3": t3c};

var out = t1c.render(ctx, partials);

console.log(out);
