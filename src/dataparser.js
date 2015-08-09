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
Parser = function(fd, cP, header) {
	this.cP = cP;
	this.dS = header[1].start;
	this.dE = header[1].end;
	this.byteOrder = /\d/g.match(cP['byteord'])
		.map(function(v) {
			return +v;
		});
	fixByteOrderIndex(this.byteOrder);
};

/**
* parse the binary data from dataset for one parameter
* @param {int} parameter number [1-tot]
*
* @returns {Object} object containing buffer and bytesize for the parameter
*/
Parser.prototype.parseParamData = function(param) {
	if(!this.cP.pName(param)) {
		throw Error('wrong parameters entered');
	}
	var
		bsize = this.cP.bsize(param),
    bcount = this.cP.bcount(param),

		buffer = new Buffer(this.cP.tot * bsize),
		i = 0
	;

	for(; i < this.cP.tot; i++) {
    // reads according byte order
    // TODO check if it is faster than proecessing byte order after the event is loaded
    this.byteOrder.forEach(function(el,index) {
      fs.readSync(fd, buffer, bcount*i + el, 1, this.dS + i * this.cP.offset() + index);
    });
	}
	return {
    buffer: buffer,
    bsize: this.bsize,
    bcount: this.bsize / 8,
    name: param
  }
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

