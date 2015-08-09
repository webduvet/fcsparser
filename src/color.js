/**
 * this is the class representing one color
 * we have here the reference to data buffer of binary stream
 * we have a info object describing the color properties
 * @constructor
 *
 * @param {Buffer} reference to binary data
 * @param {Object} info object containg byteorder, bytesize,
 *  name and index of the parameter
 * 
 */
var Color = function(o) {
  this.o = o;
  // we already have the lower ednian from read
  this.method = 'readUInt'+.byteSize+'LE';
  this.offset = 0;
}

/**
 * @param {int} offset in the buffer, index of the event
 *
 * @returns {int} parameter value
 */
Color.prototype.readEvent = function(offset) {
  var 
    ev = 0,
    i = 0
  ;
 
  ev = buf[this.method](offset * this.bcount);

  /*
  for(; i < info.biteSize; i++) {
    dot << 8;
    dot += 
  */
  return ev;
};


module.exports = Color;
