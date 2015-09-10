process.env.NODE_ENV = 'test';
process.on('uncaugthException', function(err){
  console.error(err.stack);
});

var 
	// testing header parser:
	hp = require('../src/headerparser.js'),

	fs = require('fs'),
	tc = require('nodeunit').testCase,

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
	'file 1': tc({
		'setUp': function(done) {
			done();
		},
		'tearDown': function(done) {
			done();
		},
		'read file header': function(test) {
			fd = fs.openSync(testFile1, 'r');
			header = hp.parseHeader(fd);
			test.ok(header, "expected truthy value in header");
			test.equals(header.length, 3, 'expect 3 header segments');
			test.equals(header[0].start, 58, 'expect text segment start at 58');
			test.equals(header[1].start, 1203, 'expect data segment start at 1203');
			test.equals(header[2].start, 0, 'expect analysus segment to be 0');
			test.done();
		}
	}),
	'file 2': tc({
		'read file header': function(test) {
			fd = fs.openSync(testFile2, 'r');
			header = hp.parseHeader(fd);
			test.ok(header, "expected truthy value in header");
			test.equals(header.length, 3, 'expect 3 header segments');
			test.equals(header[0].start, 256, 'expect text segment start at 58');
			test.equals(header[1].start, 1794, 'expect data segment start at 1203');
			test.equals(header[2].start, 0, 'expect analysus segment to be 0');
			test.done();
		}
  })
} 

