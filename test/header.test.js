process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});

var 
	fs = require('fs'),
	testCase = require('nodeunit').testCase,

	hp = require('../src/headerparser.js'),
	testFile1 = './test/mockdata/test1.fcs',
	testFile2 = './test/mockdata/test2.fcs',
	fd,
	header
	;

module.exports = {
  'setUp': function(done) {
    done();
  },
  'tearDown': function(done) {
		fd = null;
		header = null;
    done();
  },
  'throws error on wrong file or filepath': function(test) {
    test.done();
  },
	'read file header': {
		'file1': function(test) {
			fd = fs.openSync(testFile1, 'r');
			header = hp.parseHeader(fd);
			test.ok(header, "expected truthy value in header");
			test.equals(header.length, 3, 'expect 3 header segments');
			test.equals(header[0].start, 58, 'expect text segment satrt at 58');
			test.equals(header[1].start, 1203, 'expect data segment satrt at 1203');
			test.equals(header[2].start, 0, 'expect analysus segment to be 0');
			test.done();
		},
		'file2': function(test) {
			fd = fs.openSync(testFile2, 'r');
			header = hp.parseHeader(fd);
			console.log(header);
			test.ok(header, "expected truthy value in header");
			test.equals(header.length, 3, 'expect 3 header segments');
			test.equals(header[0].start, 256, 'expect text segment satrt at 58');
			test.equals(header[1].start, 1794, 'expect data segment satrt at 1203');
			test.equals(header[2].start, 0, 'expect analysus segment to be 0');
			test.done();
		}
  }
} 

