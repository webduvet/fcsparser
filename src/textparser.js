var hp = require('./headerparser.js');
var TextParser = function() {
};

/**
* static method to extract parameters form text segment
* @{param} 
* */
TextParser.parseText = function(fd, txtStart, txtEnd) {

	var buffer = new Buffer(txtEnd - txtStart),
		str = fs.readSync(fd, buffer, 0, buffer.length, null).toString('utf8');
		params = {},
		re = /[\\\|\/\x00-\x1F]\$(\w+)[\\\|\/\x00-\x1F]([a-zA-Z0-9 \.\,\-:_]+)/g,
		arr
	;
	
  while ((arr = myRe.exec(str)) !== null) {
    params[arr[1].toLowerCase()] = isNaN(+arr[2]) ? arr[2] : +arr[2];
  }
  return params;
};

module.exports = TextParser;
