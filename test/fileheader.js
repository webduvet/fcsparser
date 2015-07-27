process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});
var testCase = require('nodeunit').testCase;

var fp = require('../index.js'),
    testFile = './test/mockdata/test1.fcs';

module.exports = {
  'setUp': function(done) {
    console.log('setup');
    done();
  },
  'tearDown': function(done) {
    console.log('tearDown');
    done();
  },
  'throws error on wrong file or filepath': function(test) {
    test.throws(fp.init('none/esistent/file'));
    //test.throws(fp.init('mockdata/wrongFile.fcs'));
    // test.throws((function(){throw Error('fuckyou')})(), 'fuckyou', 'asdsad');
    test.done();
  },
  'reads header': function(test){
    var file = fp.init(testFile);
    test.ok(!!file.filepath, "filepath should be truthy");

    test.done();
  }
} 

