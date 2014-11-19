/* bsJS v1.0.0
 * Copyright (c) 2013 by ProjectBS Committe and contributors. 
 * http://www.bsplugin.com All rights reserved.
 * Licensed under the BSD license. See http://opensource.org/licenses/BSD-3-Clause
 */
( function( W, N ){
'use strict';
var manifest = {
	VERSION:1.0, 
	crossProxy:'http://api.bsplugin.com/bsNet/php/crossProxy.0.2.php',//'http://www.bsidesoft.com/bs/bsNet/php/crossProxy.0.2.php'
	crossProxyKey:'CROSSPROXY_DEMO_ACCESS_KEY', 
	networker:'http://www.bsidesoft.com/?networker',
	networkKey:'BSNETWORKER_20140707'
},
isDebug = 0,
err = function(num, msg){
	console.log(num, msg);
	if(isDebug) throw new Error(num, msg);
},
prefix = '0@`:',
beforeDOMLoaded = [],
bs = function(f){
	beforeDOMLoaded ? beforeDOMLoaded.push(f) : f(bs);
};

"@bsLOAD:es5.js"

bs.require = (function(module){
"@bsLOAD:require.js"
})({});

bs.classMaker = bs.require(null, function classMaker(){
"@bsLOAD:classMaker.js"
});
bs.detect = bs.require(null, function detect(){
"@bsLOAD:detect.js"
});
bs.net = bs.require(null, function net(){
"@bsLOAD:network.js"
});
bs.math = bs.require(null, function net(){
"@bsLOAD:math.js"
});
bs.str = bs.require(null, function net(){
"@bsLOAD:str.js"
});

t0 = setInterval( function(){
	var start, i;
	switch( doc.readyState ){
	case'complete':case'loaded':break;
	case'interactive':if( doc.documentElement.doScroll ) try{doc.documentElement.doScroll('left');}catch(e){return;}
	default:return;
	}
	clearInterval(t0),
	start = function(){
		var t0 = que, i = 0, j = t0.length;
		que = null;
		while( i < j ) t0[i++]();
	},
	bs.obj( 'DETECT', detectDOM( W, detect ) ), DOM(), bs.obj( 'ANI', ANIMATE() ), EXT(), 
	pque.length ? ( i = pque, pque = null, plugin( start, i ) ) : start();
}, 1 ),

})();