var fs = require('fs');
/**
* creates the text parser from given file descriptor
* @constructor
* @parama {File descriptor}
*/
var Text = function(fd, header) {
	var buffer = new Buffer(header[1].end - header[1].start),
		params = {},
    pNames = [],
    pValues = [],
		str,
		rE = /[\\\|\/\x00-\x1F]\$(\w+)[\\\|\/\x00-\x1F]([a-zA-Z0-9 \.\,\-:_]+)/g,
		arr
	;

	this.fd = fd;
	this.text = null;
  this.pNames = [];
  this.pValues = [];

	fs.readSync(fd, buffer, 0, buffer.length, null),
	str = buffer.toString('utf8');

  while ((arr = rE.exec(str)) !== null) {
    params[arr[1].toLowerCase()] = isNaN(+arr[2]) ? arr[2] : +arr[2];
    // TODO check performance of array vs chaging object shape
    // if arrays better - finish array option
    this.pNames.push(arr[1].toLowerCase());
    this.pValues.push(isNan(+arr[2]) ? arr[2] : +arr[2]);
  }

	this.text = params;

  this.eventOffset = 0;
  for( ; i < this.text.tot; i++){
    this.eventOffset += this.bsize(i);
  }

};


Text.prototype.eventOffset = function() {
	return this.eventOffset;
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
