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
var Color = function(buffer, info) {
  this.buf = buffer;
  this.info = info;
  this.method = 'readUInt'+info.byteSize+'LE';
  this.offset = 0;
}

Color.prototype.readDot = function(offset) {
  var 
    dot = 0,
    i = 0
  ;
 
  dot = buf[this.method](offset);

  /*
  for(; i < info.biteSize; i++) {
    dot << 8;
    dot += 
  */
  return dot;
};

Color.prototype.readStream

module.exports = Color;
