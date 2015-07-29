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
    headetTxt = '', offsets = {}, params = {};
  var fd = fs.openSync(path, 'r');
  fs.readSync(fd, buffer, 0, 58, null);
  headerText = buffer.toString('utf8').match(/\w+\.*\w*/g);
  if (headerText.length < 7) {
    throw Error('incorrect file, wrong header');
  }
  offsets.version = headerText[0];
  offsets.textStart = +headerText[1];
  offsets.textEnd = +headerText[2];
  offsets.dataStart = +headerText[3];
  offsets.dataEnd = +headerText[4];

  if (headerText[5] != 0 && headerText[6] != 0) {
    offsets.analysisStart = +headerText[5];
    offsets.analysisEnd = +headerText[6];
  }

  var textBuffer = new Buffer(offsets.textEnd - offsets.textStart);
  fs.readSync(fd, textBuffer, 0, textBuffer.length, offsets.textStart);
  params = textBuffer.toString('utf8');

  console.log(extractParams(params));
  console.log(offsets);

  fs.closeSync(fd);
}

function extractParams(str) {
  var myArray, myRe = /[\|\/\x00-\x1F]\$(\w+)[\|\/\x00-\x1F]([a-zA-Z0-9 \.\,-:_\/]+)/g, params = {};
  while ((myArray = myRe.exec(str)) !== null) {
    params[myArray[1].toLowerCase()] = isNaN(+myArray[2]) ? myArray[2] : +myArray[2];
  }
  return params;
}


/**
 * extract event offset based on the paremeter size
 * @param {Object}
 *
 * @returns {int}
 */
function eventOffset(params) {
  var paramOffset = 0, i = 0;
  for( , i < params.tot, i++){
    paramOffset += params['p'+i+'b'];
  }
  return paramOffset;
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
