var fs = require('fs');

var Parser = function(){
}

// fcs3 starts at 0 versiom takes 10 bytes as text, then
// every other number takes 8 bytes
// header has length 58 bytes
// start position, end position
var positionMaps = {
  v2: [],
  v3: {
    version: [0, 5],
    text: [[10, 17],[18, 25]],
    data: [[26, 33],[34, 41]],
    analysis: [[42, 49], [50, 57]],
    others: [58,null] // if text or data or analysis does not start here we have other
  }
}

var FcsStream = function(path) {
  var buffer = new Buffer(58),
    headetTxt = '', offsets = {}, params = {};
  var fd = fs.openSync(path, 'r');
  fs.readSync(fd, buffer, 0, 58, null);
  //TODO  this has to be done manually going through dedicated bytes
  headerText = buffer.toString('utf8').match(/\w+\.*\w*/g);
  if (/^fcs[23]/.test(headerText[0])) {
    console.log(headerText);
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

  params = extractParams(textBuffer.toString('utf8'));
  offsets.analysisStart = params.beginanalysis ? params.beginanalysis : offsets.analysisStart;
  offsets.analysisEnd = params.endanalysis ? params.endanalysis : offsets.analysisEnd;
  offsets.dataStart = params.begindata ? params.begindata : offsets.dataStart;
  offsets.dataEnd = params.enddata ? params.enddata : offsets.dataEnd;
  offsets.textStart = params.beginstext ? params.beginstext : offsets.textStart;
  offsets.textEnd = params.endstext ? params.endstext : offsets.textEnd;
  console.log(offsets);
  console.log(params);

  fs.closeSync(fd);
}

function getHeader() {
  return this._header;
}

function getAllParams() {
  return this._params;
}

/**
* @param {file} file descriptor
* @param {Object} parameter Map
*/
function readHeader(fd, pm) {
  var fields = Object.keys(pm), buf,
    header = {
      title: null,
      text: {
        start: null,
        end: null
      },
      data: {
        start: null,
        end: null
      },
      analysis: {
        start: null,
        end: null
      },
      other: {
        start: null,
        end: null
      }
    }
    ;

  buf = new Buffer(6);
  fs.readSync(fd, buf, 0, buf.length, null);
  header.title = buf.toString('utf8');
  
  fields.forEach(function(key, i){
    // start, first position
    buf = new Buffer(pm[key][0][1] - pm[key][0][0]);
    fs.readSync(fd, buf, 0, buf.length, null);
    header[key].start = +buf.toString('utf8');
    // end
    buf = new Buffer(pm[key][1][1] - pm[key][1][0]);
    fs.readSync(fd, buf, 0, buf.length, null);
    header[key].end = +buf.toString('utf8');
  });
}

function extractParams(str) {
  var myArray, myRe = /[\\\|\/\x00-\x1F]\$(\w+)[\\\|\/\x00-\x1F]([a-zA-Z0-9 \.\,\-:_]+)/g, params = {};
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
  for( ; i < params.tot; i++){
    paramOffset += params['p'+i+'b'];
  }
  return paramOffset;
}


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
