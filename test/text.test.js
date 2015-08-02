process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});

var 
	fs = require('fs'),
	testCase = require('nodeunit').testCase,

	mockHeader = [
		{ start: 58, end: 1202 },
		{ start: 1203, end: 113882 },
		{ start: 0, end: 0 }
	],

	hp = require('../src/headerparser.js'),
	tp = require('../src/textparser.js'),
	testFile1 = './test/mockdata/test1.fcs',
	testFile2 = './test/mockdata/test2.fcs',
	fd
	;

module.exports = {
  'setUp': function(done) {
		fd = fs.openSync(testFile1, 'r');
    done();
  },
  'tearDown': function(done) {
		fd = null;
		console.log('teardown');
    done();
  },
	'test nested': {
		'nested 1': function(test) {
			test.done();
		},
		'nested 2': function(test) {
			test.done();
		}
	},
  'reads parameters from TEXT segment': function(test){
		var header = hp.parseHeader(fd);
		test.ok(header, "expected truthy value in header");
		test.equals(header.length, 3, 'expect 3 header segments');
		test.equals(header[0].start, 58, 'expect text segment satrt at 58');
		test.equals(header[1].start, 1203, 'expect data segment satrt at 1203');
		test.equals(header[2].start, 0, 'expect analysus segment to be 0');
    test.done();
  }
} 

