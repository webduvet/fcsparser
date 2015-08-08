process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});

var 
	fs = require('fs'),
	testCase = require('nodeunit').testCase,

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

	tp = require('../src/textparser.js'),
	testFile1 = './test/mockdata/test1.fcs',
	testFile2 = './test/mockdata/test2.fcs',
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
			var params = tp.parseText(fd, mockHeader1[1]);
			test.ok(params, 'Expect truthy value in params');
			test.ok(params.tot, 'Expect to hav TOT paramter');
			test.ok(params.byteord, 'Expect to have bytorder parameter');
			test.done();
		},
		'read text segment file2': function(test) {
			fd = fs.openSync(testFile2, 'r');
			var params = tp.parseText(fd, mockHeader2[1]);
			test.ok(params, 'Expect truthy value in params');
			test.ok(params.tot, 'Expect to hav TOT paramter');
			test.ok(params.byteord, 'Expect to have bytorder parameter');
			test.done();
		}
	}
} 

