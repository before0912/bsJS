if(!Array.prototype.indexOf) Array.prototype.indexOf = function(v, I){
	var i, j, k, l;
	if(j = this.length) for(I = I || 0, i = I, k = parseInt((j - i) * .5) + i + 1, j-- ; i < k ; i++) if(this[l = i] === v || this[l = j - i + I] === v) return l;
	return -1;
};
if(!Array.prototype.isArray) Array.prototype.isArray = function(v){
	return v.splice && v.constructor == Array;
};
if( !Date.now ) Date.now = function(){return +new Date;};