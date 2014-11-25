/* bsJS v1.0.0
 * Copyright (c) 2013 by ProjectBS Committe and contributors. 
 * http://www.bsplugin.com All rights reserved.
 * Licensed under the BSD license. See http://opensource.org/licenses/BSD-3-Clause
 */
( function( W, N ){
'use strict';
var manifest = {
	VERSION:1.0, 
	crossProxy:"http://api.bsplugin.com/bsNet/",
	crossProxyKey:"CROSSPROXY_DEMO_ACCESS_KEY", 
	networker:"http://api.bsplugin.com/netWorker/",
	networkKey:'BSNETWORKER_20140707'
},
isDebug = 0,
err = function(num, msg){
	console.log(num, msg);
	if(isDebug) throw new Error(num, msg);
},
DOMLoaded,
afterDOMLoaded = [],
bs = function(f){
	afterDOMLoaded ? afterDOMLoaded.push(f) : f(bs);
},
domloader = function(){
	var id = setInterval( function(){
		var que, i, j;
		switch( doc.readyState ){
		case'complete':case'loaded':break;
		case'interactive':if( doc.documentElement.doScroll ) try{doc.documentElement.doScroll('left');}catch(e){return;}
		default:return;
		}
		clearInterval(t0),
		DOMLoaded(bs),
		que = afterDOMLoaded,
		DOMLoaded = afterDOMLoaded = i = 0, j = que.length;
		while(i < j) que[i++]();
	}, 1 );
};

"@bsLOAD:es5.js"

(function(){
	var module = {};
	(function(module){
	"@bsLOAD:core/require.js"
	})(module);
	bs.require = module.exports;
})();
(function(){
	var f = function(){
		"@bsLOAD:net/ajax.js"
	};
	f.__bsRequireID = "ajax";
	bs.ajax = bs.require(null, f);
})();

bs.JSON = (function(){
"@bsLOAD:core/json.js"
return bs_core_JSON;
})();
bs.log = bs.require(null, function classMaker(){
"@bsLOAD:core/log.js"
});

bs.classMaker = bs.require(null, function classMaker(){
"@bsLOAD:classMaker.js"
});
bs.detect = bs.require(null, function detect(){
"@bsLOAD:detect.js"
});
bs.math = bs.require(null, function net(){
"@bsLOAD:math.js"
});
bs.str = bs.require(null, function net(){
"@bsLOAD:str.js"
});
bs.cookie = bs.require(null, function net(){
"@bsLOAD:cookie.js"
});
bs.jsLoader = bs.require(null, function net(){
"@bsLOAD:jsLoader.js"
});
bs.imageLoader = bs.require(null, function net(){
"@bsLOAD:imageLoader.js"
});

DOMLoaded = function(bs){
	
};
})(this);