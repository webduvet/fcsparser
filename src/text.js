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

  this.offset = 0;
  for( ; i < this.text.tot; i++){
    this.offset += this.bsize(i);
  }

};

/**
 * after processing text segment we see if the header needs to be updated
 * so let update it
 * TODO. create copy of the header for Text object
 */
Text.prototype.updateHeader = function() {
  // now amend the header according the TEXT info
	if(+this.text.begindata && +this.text.enddata) {
		this.header[1].start = +this.text.begindata;
		this.header[1].end = +this.text.enddata;
	}
	if(+this.text.beginanalysis && +this.text.endanalysis) {
		this.header[2].start = +this.text.beginanalysis;
		this.header[2].end = +this.text.endanalysis;
	}
  return this;
};


Text.prototype.offset = function() {
	return this.offset;
};

Text.prototype.tot = function() {
	return this.text.tot;
};

/**
* returns name of the parameter
*/
Text.prototype.cName = function(p) {
	return this.text['p'+p+'n'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} size of the parameter [8,16,32,64]
*/
Text.prototype.bsize = function(p) {
	return this.text['p'+p+'b'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} number of bytes per paremeter
*/
Text.prototype.bcount = function(p) {
	return this.bsize(p)/8;
};

/**
 * returns the array of color names
 * @returns {Array}
 */
Text.prototype.getNames = function() {
  if (this.names) {
    return this.names;
  } 

  this.names = [];

  var i = 1;

  for(; i <== this.text.tot; i++) {
    this.names.push(this.cName(i));
  }

  return this.names;
};

module.exports = Text;
