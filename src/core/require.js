var bs_core_require = (function(){
	var required = {}, funcID = 1,
	require = function(data){
		var module = {exports:{}};
		try{
			(new Function("module,require", data + "\n\n;")).call(this, module, result);
		}catch(e){
			return console.log(7001, e + "::" + data);
		}
		return  module.exports;
	},
	result = function(onload){
		var result = [], targets = arguments, i = 1, j = targets.length, 
		loader = function(){
			var target, type, module, id;
			if(i < j){
				target = targets[i++], type = typeof target;
				if(type == "string") module = required[target];
				else if(type == "function"){
					id = target.__bsRequireID;
					module = required[id];
				}else return console.log(7002, type);
				if(!module){
					if(type == "string"){
						id = target;
						if(!onload) module = require(id, required.ajax.get(null, target));
						else return required.ajax.get(function(data){
							result.push(required[target] = require(target, data));
							loader();
						}, target);
					}else{
						if(!id) target.__bsRequireID = id = funcID++;
						target = target.toString(),
						module = require(target.substring(target.indexOf("{") + 1, target.lastIndexOf("}")));
					}
					required[id] = module;
				}
				result.push(module),
				loader();
			}else{
				if(result.length == 1) result = result[0];
				if(onload) onload(result);
			}
		};
		loader();
		return result;
	};
	return result;
})();
if(module) module.exports = bs_core_require;