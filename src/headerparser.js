'use strict';

var fs = require('fs');


/**
* static method to parse fcs 2.0 and 3.0 (1) file headers
* reads the file header according the standards
* 0 - 5 	file type
* 6 - 9		empty space
* 10 - 17	text start posistion (8 bytes)
* 18 - 25 text end position
* 26 - 33 data start position
* 34 - 41 data end position
* 42 - 49 analysis start position
* 50 - 57 analysis end position, (all 8 bytes)
* (optional)
*	58 - until the text section - other (8 bytes each)
*
* further information about data section or analysis section can be
* provided in text section
* so this bit literary only reads the standard header
*
* @param {filde descriptor} instance of file
*
* @returns {Object} header as read from the file
* first 3 values pairs in returned header are TEXT DATA and ANALYSIS
*
*/
module.exports = {
  parseHeader: function(fd) {
    var version,
      versionBuffer = new Buffer(10),
      buffer = new Buffer(48), 
      values,
      otherValues,
      type,
      i1 = 0,
      i2 = 1,
      header = [];

    // read fcs version
    fs.readSync(fd, versionBuffer, 0, 10, null);
    version = versionBuffer.toString().trim();

    fs.readSync(fd, buffer, 0, buffer.length, null);
    values = buffer.toString()
      .match(/.{1,8}/g)
      .map(function(el) {
        return +el;
      })
    //	.sort()
      ;

    // check for invalid data in header
    if (isNaN(values[0])) {
      throw Error('invalid header data');
    }

    for( i1, i2; i2 < values.length; i1 += 2, i2 +=2){
      header.push({
        start: values[i1],
        end: values[i2]
      });
    }
    // check for extended header
    if (values[0] > 58) {
      var otherBuffer = new Buffer(values[0] - 58);
      fs.readSync(fd, otherBuffer, 0, otherBuffer.length, null);
      otherValues = otherBuffer.toString()
        .match(/.{1,8}/g)
        .map(function(el) {
          return +el;
        })
    //		.sort()
        ;
      for( i1, i2; i2 < otherValues.length; i1 += 2, i2 +=2){
        if(otherValues[i1] && otherValues[i2]) {
          header.push({
            start: otherValues[i1],
            end: otherValues[i2]
          });
        }
      }
    }
    return header;
  },
  /**
   * after processing text segment we see if the header needs to be updated
   * so let update it
   * TODO. create copy of the header for Text object
   */
  updateHeader: function(header, text) {
    // now amend the header according the TEXT info
    if(+text.begindata && +text.enddata) {
      header[1].start = +text.begindata;
      header[1].end = +text.enddata;
    }
    if(+text.beginanalysis && +text.endanalysis) {
      header[2].start = +text.beginanalysis;
      header[2].end = +text.endanalysis;
    }
    return header;
  }
};


