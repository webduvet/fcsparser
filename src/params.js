var EventParams = function(params) {
	this.params = params;
	this.offset = null;
};

EventParams.prototype.offset = function() {
	if(!this.offset) {
		var i=0;
		this.offset = 0;
		for( ; i < this.params.tot; i++){
			this.offset += this.params.pSize(i);
		}
	}
	return this.offset;
};

EventParams.prototype.tot = function() {
	return this.params.tot;
};

/**
* returns name of the parameter
*/
EventParams.prototype.pName = function(p) {
	return this.params['p'+p+'n'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} size of the parameter [8,16,32,64]
*/
EventParams.prototype.byteSize = function(p) {
	return this.params['p'+p+'b'];
};

/**
* returns size of the parameter value in bytes
* @param {int} parameter name (number)
*
* @return {int} number of bytes per paremeter
*/
EventParams.prototype.byteCount = function(p) {
	return this.params['p'+p+'b']/8;
};


module.exports = EventParams;
