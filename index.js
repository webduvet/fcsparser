var fs = require('fs');

var Parser = function(){
}

// fcs3 starts at 0 versiom takes 10 bytes as text, then
// every other number takes 8 bytes
// header has length 58 bytes
var offsets = {
  v2: [],
  v3: {
    version: [0],
    text: [10, 18], // start end, 8 bytes each position
    data: [26, 34],
    analysis: [42, 50]
  }
}

var FcsStream = function(path) {
  var buffer = new Buffer(58),
    headetTxt = '', offsers = {};
  var fd = fs.openSync(path, 'r');
  fs.readSync(fd, buffer, 0, 58, null);
  fs.closeSync(fd);
  headerText = buffer.toString('utf8').match(/\w+\.*\w*/g);
  if (headerText.length < 7) {
    throw Error('incorrect file, wrong header');
  }
  offsets.version = headerText[0];
  offsets.textStart = headerText[1];
  offsets.textEnd = headerText[2];
  offsets.dataStart = headerText[3];
  offsets.dataEnd = headerText[4];
  if (headerText[5] != 0 && header[6] != 0) {
    offsets.analysisStart = headerText[5];
    offsets.analysisEnd = headerText[6];
  }
}

var fcs = new FcsStream('./test/mockdata/test1.fcs');

Parser.parseHeader = function(file) {
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
}



/**
 * returns the header objects
 *
 * @returns {Object} Key value pairs containing the header info
 */
Parser.prototype.getHeader = function() {
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
Parser.prototype.getParams = function() {
  var params = {}

  return params;
};

Parser.init = function(filePath){
  var file;
  try {
    file = fs.readFileSync(filePath);
  } catch (e) {
    console.log('bad');
    throw new Error({file: filePath, error: e, message: "can't open the file"});
  }

  return new Parser(file);
}


module.exports = Parser;
