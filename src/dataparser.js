/**
* TODO make configurable cache for param buffer
*/
var
	Parser,
	fs = require('fs')
;

/**
* creates instance of event parser which can parse data for two parameters
* so they can be plotted into dotted graph
*
* @param {file descriptor}
* @param {EventParam} instance of parameters object
* 	this object needs to be valid,	we do not check it here. the paraparser does it.
* @param {Object} header info
*/
Parser = function(fd, eP, header) {
	this.eP = eP;
	this.dS = header.data.start;
	this.dE = header.data.end;
	this.byteOrder = /\d/g.match(eP['byteord'])
		.map(function(v) {
			return +v;
		});
	fixByteOrderIndex(this.byteOrder);
};

/**
* parser the pair of parameters so we can draw a graph
* @param {int} parameter number [1-tot]
*
* @returns {Object} object containing two buffers one for each paremeter
*/
Parser.prototype.parseParamData = function(param) {
	if(!eP.pName(param)) {
		throw Error('wrong parameters entered');
	}
	var
		bsize = this.eP.pByteSize(param),
		buffer = new Buffer(this.eP.tot * bsize),
		i = 0
	;

	for(; i < this.eP.tot; i++) {
    // reads according byte order
    // TODO check if it is faster than proecessing byte order after the event is loaded
    this.byteOrder.forEach(function(el,index) {
      fs.readSync(fd, buffer, bsize*i + el, 1, this.dS + i * this.eP.offset() + index);
    });
		// fs.readSync(fd, buffer, bsize*i, bsize, this.dS + i * this.eP.offset());
	}
	return buffer;
};

module.exports = Parser;

/**
* byte order is marked as 1,2,3,4
* we need 0,1,2,3 
* to match the array
*/
function fixByteOrderIndex(val) {
	if(val.contains(0)) {
		return;
	}
	val.map(function(v){
		return v-1;
	});
}

