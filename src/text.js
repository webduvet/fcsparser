var fs = require('fs');
/**
* creates the text parser from given file descriptor
* @constructor
* @parama {File descriptor}
*/
var Text = function(fd, header) {
	var buffer = new Buffer(header[1].end - header[1].start),
		params = {},
		str,
		rE = /[\\\|\/\x00-\x1F]\$(\w+)[\\\|\/\x00-\x1F]([a-zA-Z0-9 \.\,\-:_]+)/g,
		arr
	;

	this.fd = fd;
	this.header = header;
	this.text = null;

	fs.readSync(fd, buffer, 0, buffer.length, null),
	str = buffer.toString('utf8');

  while ((arr = rE.exec(str)) !== null) {
    params[arr[1].toLowerCase()] = isNaN(+arr[2]) ? arr[2] : +arr[2];
  }

	this.text = params;

  // now amend the header according the TEXT info
	if(+params.begindata && +params.enddata) {
		header[1].start = +params.begindata;
		header[1].end = +params.enddata;
	}
	if(+params.beginanalysis && +params.endanalysis) {
		header[2].start = +params.beginanalysis;
		header[2].end = +params.endanalysis;
	}
};


module.exports = TextParser;
