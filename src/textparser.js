var TextParser = function() {
};

/**
* static method to extract parameters form text segment
* @param {file descriptor}
* @param {Object} header object - will be be ammended if any further data is
* 	discovered in text segment
*
* @returns {object} parameter set for fcs file
* */
TextParser.parseText = function(fd, header) {

	var buffer = new Buffer(header.text.end - header.text.start),
		str = fs.readSync(fd, buffer, 0, buffer.length, null).toString('utf8');
		params = {},
		rE = /[\\\|\/\x00-\x1F]\$(\w+)[\\\|\/\x00-\x1F]([a-zA-Z0-9 \.\,\-:_]+)/g,
		arr
	;
	
  while ((arr = rE.exec(str)) !== null) {
    params[arr[1].toLowerCase()] = isNaN(+arr[2]) ? arr[2] : +arr[2];
  }
	if(+params.begindata && +params.enddata) {
		header.data.start = +params.begindata;
		header.data.end = +params.enddata;
	}
	if(+params.beginanalysis && +params.endanalysis) {
		header.analysis.start = +params.beginanalysis;
		header.analysis.end = +params.endanalysis;
	}
  return params;
};

module.exports = TextParser;
