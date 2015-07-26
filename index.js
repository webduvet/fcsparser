var fs = require('fs');

var Parser = function(){

}

/**
 * returns the header objects
 *
 * @returns {Object} Key value pairs containing the header info
 */
Parser.prototype.getHeader = function(){
  var header = {
    type: '',
    size: 0,
    data:{
      start: null,
      end: null,
      size: 0,
      endianess: null
    },
    analysis: {
      start: null,
      end: null
    }
  };
  return header;
};

/**
 * return parameters object
 *
 * @returns {Object} key value pairs param name param value
 */
Parser.prototype.getParams(){
  var params = {}

  return params;
};

Parser.init = function(filePath){
  var file;
  try {
    file = fs.readFileSync(filePath);
  } catch (e) {
    console.log('bad');
    throw new Error('BAAAAAD');
  }

  return new Parser(file);
}


module.exports = Parser;
