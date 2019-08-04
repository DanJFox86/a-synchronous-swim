var parser = require('parse-multipart');

var getBoundary = function(buffer) {
  var finder = /--(----\w+)\b/;
  var boundary = buffer.toString().match(finder);
  return boundary ? boundary[1] : null;
};

var parse = function(buffer) {
  var boundary = getBoundary(buffer);
  return parser.Parse(buffer, boundary);
};

var getFile = function(buffer) {
  var parts = parse(buffer);
  for (var part of parts) {
    // return first part with filename and data keys
    if (part.filename && part.data) {
      return part;
    }
  }
  return null;
};

