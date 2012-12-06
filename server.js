var connect = require('connect');

var defaultIndex = function(req, res, next) {
  if (/^\/([a-zA-Z0-9-_]*)$/.exec(req.url)) {
    req.url = '/index.html'
  }
  next();
};

var server = connect(
  defaultIndex,
  connect.static(__dirname, {maxAge: 0})
);

server.listen(3000);