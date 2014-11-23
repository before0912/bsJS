var bs_core_JSON = {
	parse:function(v){
		return (new Function("", "return " + v))();
	},
	stringify:(function(){
		var r = /["]/g,
		func = function(v){
			var result, i, j;
			if( v === null ) return "null";
			else if( v === undefined ) return "undefined";
			switch(typeof v){
			case"function":return "function";
			case"string":return '"' + v.replace(r, '\\"') + '"';
			case"number":case"boolean":return v.toString();
			case'object':
				result = "";
				if( v.splice ){
					for(i = 0, j = v.length ; i < j ; i++) result += ',' + func(v[i]);
					result = "[" + result.substr(1) + "]";
				}else{
					for(i in v) if(v.hasOwnProperty(i)) result += ',"' + i + '":' + func(v[i]);
					result = '{' + result.substr(1) + '}';
				}
				return result;
			}
		};
		return func;
	})()
};
if(!this['JSON']) this['JSON'] = bs_core_JSON;
if(module) module.exports = bs_core_JSON;