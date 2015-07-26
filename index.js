var fs = require('fs');

var Parser = function(){

}

Parser.init = function(filePath){
  var file;
  try {
    file = fs.readFileSync(filePath);
  } catch (e) {
    console.log('bad');
    throw new Error('BAAAAAD');
  }

  return {
  };
}


module.exports = Parser;
