var rc = 0,
rand = function(){
	return rc = ( ++rc ) % 1000, rand[rc] || ( rand[rc] = Math.random() );
},
mk = function(target, method){
	return function(radian){
		return target[radian] || target[radian] == 0 ? 0 : ( target[radian] = Math[method](radian) );
	};
},
result = {
	rand:function(a, b){
		return parseInt(rand() * (b - a + 1)) + a;
	},
	randf:function(a, b){
		return rand() * (b - a) + a;
	},
	sin:mk({}, 'sin'),
	cos:mk({}, 'cos'),
	tan:mk({}, 'tan'),
	atan:mk({}, 'atan')
};
module.exports = result;