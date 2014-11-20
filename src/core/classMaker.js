var S = function(){
	var i = 0, j = arguments.length;
	while(i < j){k = arguments[i++];if(i == j) return this[k];((v = arguments[i++]) === null) ? delete this[k] : (this[k] = v);}
	return v;
},
NEW = function(){},
DELETE = function(){
	delete this.__cache[this.__bsID];
},
FACTORY = function(cls, cache, arg){
	var id = arg[0], result, t0;
	if(id && typeof id == 'string'){
		t0 = id.charAt(0);
		if(t0 == '@') result = cache[id = id.substr(1)] = new cls(FACTORY);
		else if(t0 != '<') result = cache[id] || (cache[id] = new cls(FACTORY));
		if(result) result[prefix + 'id'] = id;
	}
	if(!result) result = new cls(FACTORY);
	result.NEW(arg);
	return result;
},
POOL = function(id){
	var pool = this.prototype[prefix + 'pool'], result;
	if(!(result = pool[id])) result = new cls(FACTORY);
	result.POOL(arguments);
	return result;
},
result = function(name, func){
	var cls, protos = {PARENT:null, S:S, NEW:NEW, DELETE:DELETE, POOL:null}, statics = {}, fn, cache = {}, pool, k;
	
	cls = function(){
		if( this instanceof cls ){
			if( arguments[0] != FACTORY ) this.NEW(arguments);
		}else return FACTORY( cls, cache, arguments);
	},
	func(protos, statics, bs);
	
	if( protos.PARENT ) cls.prototype = fn = new protos.PARENT();
	else fn = cls.prototype;
	fn[prefix + 'cache'] = cache;

	for( k in protos ) if( protos.hasOwnProperty(k) ) fn[k] = protos[k];
	for( k in statics ) if( statics.hasOwnProperty(k) ) f[k] = t2[k];
	
	if( protos.POOL ){
		fn[prefix + 'pool'] = pool = {};
		cls.pool = POOL;
	}
	
	return cls;
};

module.exports = result;