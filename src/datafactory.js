'use strict';
/**
* TODO make configurable cache for param buffer
*/
var
	DataFactory,
	fs = require('fs')
;

/**
* create sfactory instance
* @constructor
* this factory creates the instanc ef the data object representing one color
* data object contains basic info and reference to binary data buffer
*
* @param {file descriptor}
* @param {TextSegment} instance of text segment object
* 	this object needs to be valid,	we do not check it here. the paraparser does it.
* @param {Object} header info
*/
DataFactory = function(fd, tS, header) {
	this.tS = tS;
	this.dS = header[1].start;
	this.dE = header[1].end;
	this.byteOrder = /\d/g.match(tS['byteord'])
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
DataFactory.prototype.parseColor = function(colorIndex) {
	if(!this.tS.pName(colorIndex)) {
		throw Error('wrong parameters entered');
	}
	var
		bsize = this.tS.bsize(colorIndex),
    bcount = this.tS.bcount(colorIndex),

		buffer = new Buffer(this.tS.tot * bsize),
		i = 0
	;

	for(; i < this.tS.tot; i++) {
    // reads according byte order
    // TODO check if it is faster than processing byte order after the event is loaded
    this.byteOrder.forEach(function(el,index) {
      fs.readSync(fd, buffer, bcount*i + el, 1, this.dS + i * this.tS.eventOffset() + index);
    });
	}
  // data for one color
	return {
    buffer: buffer,
    bsize: this.bsize,
    bcount: this.bsize / 8,
    colorIndex: colorIndex,
    name: this.tS.pName(colorIndex)
  }
};

module.exports = DataFactory;

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

