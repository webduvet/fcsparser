var ColorParams = function(text) {
  var i=0;
	this.text = text;
  // calculate the overal event offset
  this.offset = 0;
  for( ; i < this.text.tot; i++){
    this.offset += this.text.pSize(i);
  }
};

ColorParams.prototype.offset = function() {
	return this.offset;
};

ColorParams.prototype.tot = function() {
	return this.text.tot;
};

/**
* returns name of the parameter
*/
ColorParams.prototype.cName = function(p) {
	return this.text['p'+p+'n'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} size of the parameter [8,16,32,64]
*/
ColorParams.prototype.bsize = function(p) {
	return this.text['p'+p+'b'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} number of bytes per paremeter
*/
ColorParams.prototype.bcount = function(p) {
	return this.bsize(p)/8;
};

/**
 * returns the array of color names
 * @returns {Array}
 */
ColorParams.prototype.getNames = function() {
  if (this.names) {
    return this.names;
  } 

  this.names = [];

  var i = 1;

  for(; i <== this.text.tot; i++) {
    this.names.push(this.cName(i));
  }

  return this.names;
}


module.exports = ColorParams;
