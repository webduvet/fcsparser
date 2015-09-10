process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});

var 
	// testing textSegment parser
	Ts = require('../src/textsegment.js'),

	fs = require('fs'),
	testCase = require('nodeunit').testCase,

	testFile1 = './test/mockdata/test1.fcs',
	testFile2 = './test/mockdata/test2.fcs',

	// this need to corespodent to test files
	mockHeader1 = [
		{ start: 58, end: 1202 },
		{ start: 1203, end: 113882 },
		{ start: 0, end: 0 }
	],
	mockHeader2 = [
		{ start: 58, end: 1202 },
		{ start: 1203, end: 113882 },
		{ start: 0, end: 0 }
	],
	fd
	;

module.exports = {
  'setUp': function(done) {
    done();
  },
  'tearDown': function(done) {
		fd = null;
    done();
  },
	'happy path': {
		'read text segment file1': function(test) {
			fd = fs.openSync(testFile1, 'r');
			var params = new Ts(fd, mockHeader1);
			test.ok(params, 'Expect truthy value in params');
			test.ok(params.getNames(), 'Expect to have some parameter names');
			test.equals(params.tot(), 5634, 'Expect to hav TOT paramter equal to 5634');
			test.done();
		},
		'read text segment file2': function(test) {
			fd = fs.openSync(testFile2, 'r');
			var params = new Ts(fd, mockHeader1);
			test.ok(params, 'Expect truthy value in params');
			test.ok(params.getNames(), 'Expect to have some parameter names');
			test.equals(params.tot(), 10000, 'Expect to hav TOT paramter');
			test.done();
		}
	}
} 

