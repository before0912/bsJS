var bsTest = (function(){
	var md5, f2s, compare, js,
		printer, result, id, md52id, test, 
		isNode, con, conStyles;
		
	md5 = (function(){function p(a,g){var b=(a&65535)+(g&65535);return(a>>16)+(g>>16)+(b>>16)<<16|b&65535}function k(a,g,b,n,k,h){a=p(p(g,a),p(n,h));return p(a<<k|a>>>32-k,b)}function h(a,g,b,n,h,l,m){return k(g&b|~g&n,a,g,h,l,m)}function l(a,g,b,n,h,l,m){return k(g&n|b&~n,a,g,h,l,m)}function m(a,g,b,n,h,l,m){return k(b^(g|~n),a,g,h,l,m)}function q(a,g){a[g>>5]|=128<<g%32;a[(g+64>>>9<<4)+14]=g;var b,n,s,t,q,c=1732584193,d=-271733879,e=-1732584194,f=271733878;for(b=0;b<a.length;b+=16)n=c,s=d,t=e,q=f,c=h(c,d,
e,f,a[b],7,-680876936),f=h(f,c,d,e,a[b+1],12,-389564586),e=h(e,f,c,d,a[b+2],17,606105819),d=h(d,e,f,c,a[b+3],22,-1044525330),c=h(c,d,e,f,a[b+4],7,-176418897),f=h(f,c,d,e,a[b+5],12,1200080426),e=h(e,f,c,d,a[b+6],17,-1473231341),d=h(d,e,f,c,a[b+7],22,-45705983),c=h(c,d,e,f,a[b+8],7,1770035416),f=h(f,c,d,e,a[b+9],12,-1958414417),e=h(e,f,c,d,a[b+10],17,-42063),d=h(d,e,f,c,a[b+11],22,-1990404162),c=h(c,d,e,f,a[b+12],7,1804603682),f=h(f,c,d,e,a[b+13],12,-40341101),e=h(e,f,c,d,a[b+14],17,-1502002290),d=
h(d,e,f,c,a[b+15],22,1236535329),c=l(c,d,e,f,a[b+1],5,-165796510),f=l(f,c,d,e,a[b+6],9,-1069501632),e=l(e,f,c,d,a[b+11],14,643717713),d=l(d,e,f,c,a[b],20,-373897302),c=l(c,d,e,f,a[b+5],5,-701558691),f=l(f,c,d,e,a[b+10],9,38016083),e=l(e,f,c,d,a[b+15],14,-660478335),d=l(d,e,f,c,a[b+4],20,-405537848),c=l(c,d,e,f,a[b+9],5,568446438),f=l(f,c,d,e,a[b+14],9,-1019803690),e=l(e,f,c,d,a[b+3],14,-187363961),d=l(d,e,f,c,a[b+8],20,1163531501),c=l(c,d,e,f,a[b+13],5,-1444681467),f=l(f,c,d,e,a[b+2],9,-51403784),
e=l(e,f,c,d,a[b+7],14,1735328473),d=l(d,e,f,c,a[b+12],20,-1926607734),c=k(d^e^f,c,d,a[b+5],4,-378558),f=k(c^d^e,f,c,a[b+8],11,-2022574463),e=k(f^c^d,e,f,a[b+11],16,1839030562),d=k(e^f^c,d,e,a[b+14],23,-35309556),c=k(d^e^f,c,d,a[b+1],4,-1530992060),f=k(c^d^e,f,c,a[b+4],11,1272893353),e=k(f^c^d,e,f,a[b+7],16,-155497632),d=k(e^f^c,d,e,a[b+10],23,-1094730640),c=k(d^e^f,c,d,a[b+13],4,681279174),f=k(c^d^e,f,c,a[b],11,-358537222),e=k(f^c^d,e,f,a[b+3],16,-722521979),d=k(e^f^c,d,e,a[b+6],23,76029189),c=k(d^
e^f,c,d,a[b+9],4,-640364487),f=k(c^d^e,f,c,a[b+12],11,-421815835),e=k(f^c^d,e,f,a[b+15],16,530742520),d=k(e^f^c,d,e,a[b+2],23,-995338651),c=m(c,d,e,f,a[b],6,-198630844),f=m(f,c,d,e,a[b+7],10,1126891415),e=m(e,f,c,d,a[b+14],15,-1416354905),d=m(d,e,f,c,a[b+5],21,-57434055),c=m(c,d,e,f,a[b+12],6,1700485571),f=m(f,c,d,e,a[b+3],10,-1894986606),e=m(e,f,c,d,a[b+10],15,-1051523),d=m(d,e,f,c,a[b+1],21,-2054922799),c=m(c,d,e,f,a[b+8],6,1873313359),f=m(f,c,d,e,a[b+15],10,-30611744),e=m(e,f,c,d,a[b+6],15,-1560198380),
d=m(d,e,f,c,a[b+13],21,1309151649),c=m(c,d,e,f,a[b+4],6,-145523070),f=m(f,c,d,e,a[b+11],10,-1120210379),e=m(e,f,c,d,a[b+2],15,718787259),d=m(d,e,f,c,a[b+9],21,-343485551),c=p(c,n),d=p(d,s),e=p(e,t),f=p(f,q);return[c,d,e,f]}function u(a){var g,b="";for(g=0;g<32*a.length;g+=8)b+=String.fromCharCode(a[g>>5]>>>g%32&255);return b}function r(a){var g,b=[];b[(a.length>>2)-1]=void 0;for(g=0;g<b.length;g+=1)b[g]=0;for(g=0;g<8*a.length;g+=8)b[g>>5]|=(a.charCodeAt(g/8)&255)<<g%32;return b}function v(a,g){var b,
h=r(a),k=[],l=[];k[15]=l[15]=void 0;16<h.length&&(h=q(h,8*a.length));for(b=0;16>b;b+=1)k[b]=h[b]^909522486,l[b]=h[b]^1549556828;b=q(k.concat(r(g)),512+8*g.length);return u(q(l.concat(b),640))}function w(a){var g="",b,h;for(h=0;h<a.length;h+=1)b=a.charCodeAt(h),g+="0123456789abcdef".charAt(b>>>4&15)+"0123456789abcdef".charAt(b&15);return g}function x(a){a=unescape(encodeURIComponent(a));return u(q(r(a),8*a.length))}return function(a,g,b){g?b?a=v(unescape(encodeURIComponent(g)),unescape(encodeURIComponent(a))):
(a=v(unescape(encodeURIComponent(g)),unescape(encodeURIComponent(a))),a=w(a)):a=b?x(a):w(x(a));return a}})(),
	md52id = {},
	f2s = (function(){
		var r0 = /</g, r1 = /\t/g;
		return function(f){
			var t0, t1, i, j;
			t0 = f.toString().split('\n'), t1 = t0[t0.length - 1], t1 = t1.substr( 0, t1.length - 1 );
			for( i = 0, j = t0.length ; i < j ; i++ ) if( t0[i].substr( 0, t1.length ) == t1 ) t0[i] = t0[i].substr(t1.length);
			return t0.join('\n').replace( r0, '&lt;' ).replace( r1, '  ' );
		};
	})(),
	compare = (function(){
		var t0 = [], deepCompare = function( a, b ){
			var t0, i, j;
			if( (t0 = typeof a) != typeof b ) return false;
			switch( t0 ){
			case'number':case'boolean':
			case'undefined':
			case'string': return a === b;
			case'object':
				if( a === null ) return a === b;
				else if( a.splice ){
					if( a.length != b.length ) return false;
					for( i = 0, j = a.length ; i < j ; i++ ) if( !deepCompare( a[i], b[i] ) ) return false;
					return true;
				}else{
					j = 0;
					for( i in b ) j++;
					for( i in a ){
						if( !deepCompare( a[i], b[i] ) ) return false;
						j--;
					}
					return !j;
				}
			}
		};
		return function( t, o ){
			switch( t.bsTestType ){
			case'in':return t0[0] = 'of [' + t.join(',') +']', t0[1] = t.indexOf(o) > -1 ? 1 : 0, t0;
			case'not':return t0[0] = '!= ' + t[0], t0[1] = o !== t[0] ? 1 : 0, t0;
			case'item':return t0[0] = '== ' + t, t0[1] = deepCompare( t, o ), t0;
			case'range':return t0[0] = '( ' + t[0] + ' ~ ' + t[1] + ' ) ', t0[1] = t[0] <= o && o <= t[1], t0;
			default:return t0[0] = t, t0[1] = o, t0;
			}
		};
	})(),
	js = (function(doc){
		var h = doc.getElementsByTagName('head')[0];
		return function( id, fail ){
			var t0, i, c;
			c = test.__callback, t0 = doc.createElement('script'), t0.type = 'text/javascript', t0.charset = 'utf-8', h.appendChild(t0);
			t0.src = 'http://www.bsplugin.com/test/index.php?f=' + encodeURI(location.href) + '&id=' + encodeURI(id) + '&r=' + (fail ? 0 : 1) + '&rand='+Math.random();
		};
	})(document),
	id = 0,
	test = function( title ){
		var r, expected, val, txt, ok, fail, t0, i, j;
		id++,
		r = isNode ? [['[test#'+id+'] '+title+'\n========================', 'white']] :
			'<div style="border:1px dashed #999;padding:10px;margin:10px">'+
				'<div id="bsTestOn'+id+'" style="display:none;cursor:pointer" onclick="bsTest.on(this)">'+
					'<div style="float:left">'+
						'<b>'+title+'</b><hr>'+
							'<ol>';
		//test
		ok = fail = 0, i = 1, j = arguments.length;
		while( i < j ){
			t0 = arguments[i++], expected = arguments[i++];
			//value
			txt = typeof t0 == 'function' ? ( val = t0(), f2s(t0) ) : ( val = arguments[i++], t0 );
			//compare
			if( val && val.bsTestType ) t0 = compare( val, expected );
			else if( expected && expected.bsTestType ) t0 = compare( expected, val );
			else t0 = compare( ' == ' + expected, val === expected );
			//result
			t0[1] ? ok++ : fail++;
			txt = ( isNode ? txt + ' :: ' :
					'<li><pre style="display:inline;">' + txt + '</pre> <b>' + val + '</b> :: <b>'
				) + 
				t0[0] +
				( isNode ? t0[1] ? ' OK' : ' FAIL' :
					'</b> <b style="color:#' + ( t0[1] ? '0a0">OK' : 'a00">NO') + '</b></li>'
				);
			isNode ? r[r.length] = con( txt, t0[1] ? 'green' : 'red' ) : r += txt;
		}
		//total result
		if( fail ) test.isOK = 0;
		//print
		if( isNode ){
			console.log( t0 = 'RESULT[#' + id + '] : ' + ( fail ? con("FAIL", 'red') : con( 'OK', 'green') ) + '[' + con( "OK: " + s, 'green' ) + ' ' + con( "FAIL: " + f, 'red' ) + ']' );
			for( i = 0, j = r.length ; i < j ; i++) console.log(r[i]);
			console.log(t0);
		}else{
			printer( r = r + '</ol><div id="bsTestStat'+id+'">Loading...</div></div>'+
				'<div style="padding:5px;float:right;border:1px dashed #999;text-align:center"><b style="font-size:30px;color:#' + ( fail ? 'a00">FAIL' : '0a0">OK' ) + '</b><br>ok:<b style="color:#0a0">' + ok + '</b> fail:<b style="color:#a00">' + fail + '</b></div><br clear="both"></div>'+
				'<div id="bsTestOff'+id+'" style="display:block;cursor:pointer" onclick="bsTest.off(this)"><b>'+title+'</b> : <b style="color:#' + ( fail ? 'a00">FAIL' : '0a0">OK' ) + '</b></div></div>'
			),
			t0 = window.top;
			console.log(t0 != window.self, t0.bsTest?1:0, t0.bsTest.suite.urls, fail)
			if( t0 != window.self && t0.bsTest && t0.bsTest.suite.urls && fail ){
				r = window.location.pathname.split("/").pop(),
				console.log(r);
				t0.document.getElementById(r).innerHTML = '<b style="font-size:20px;color:#a00">FAIL</b>',
				t0.bsTest.suiteResult( '<div style="font-weight:bold;font-size:30px;padding:10px;color:#a00">FAIL</div><hr>' );
			}
			if( result ) result( '<hr><div style="font-weight:bold;font-size:30px;padding:10px;color:#' + ( fail ? 'a00">FAIL' : '0a0">OK' ) + '</div>' );
			//i = md5(r)
			md52id[id] = id,
			js( id, fail );
		}
	},
	test.callback = function(data){
		var t0, t1, i, j, k;
		if( t0 = data.rs ){
			for( i = 0, j = t0.length ; i < j ; i++ ) if( t1 = document.getElementById( 'bsTestStat' + md52id[t0[i][0]] ) ) t1.innerHTML = '';
			for( i = 0 ; i < j ; i++ ){
				if( t1 = document.getElementById( 'bsTestStat' + md52id[t0[i][0]] ) ) t1.innerHTML += 
					'<div style="width:30%;float:left;font-size:10px;margin-bottom:10px;background:#eee">' + t0[i][1] + '</div>'+
					'<div style="float:left;margin-left:5px;margin-bottom:10px">ok:<b style="color:#0a0">' + t0[i][2] + '</b> fail:<b style="color:#a00">' + t0[i][3] + '</b></div>'+
					'<br style="clear:both">';
			}
		}
	},
	test.isOK = 1,
	test.on = function(dom){dom.style.display = 'none', document.getElementById('bsTestOff'+dom.id.substr(8)).style.display = 'block';},
	test.off = function(dom){dom.style.display = 'none', document.getElementById('bsTestOn'+dom.id.substr(9)).style.display = 'block';};
	test.NOT = function(){return arguments.bsTestType = 'not', arguments;},
	test.ITEM = function(a){return a.bsTestType = 'item', a;},
	test.IN = function(){
		var t0 = Array.prototype.slice.call( arguments, 0 );
		return t0.bsTestType = 'in', t0;
	},
	test.RANGE = function( a, b ){
		var t0 = [a,b];
		return t0.bsTestType = 'range', t0;
	},
	test.tear = function( title, func ){
		id++, func();
		if( isNode ) console.log( '[tear#'+id + '] '+ title + '\n======================' + f2s(func) + '\n' );
		else printer(
			'<div style="border:1px solid #999;background:#eee;padding:10px;margin:10px">'+
				'<div id="bsTestOn'+id+'" style="display:none;cursor:pointer" onclick="bsTest.on(this)"><b>'+title+'</b><hr><pre>'+f2s(func)+'</pre></div>'+
				'<div id="bsTestOff'+id+'" style="display:block;cursor:pointer" onclick="bsTest.off(this)"><b>'+title+'</b></div>'+
			'</div>' );
	};
	if( typeof process !== 'undefined' && process.version ){
		isNode = 1,
		conStyle = {
			'bold':['\x1B[1m','\x1B[22m'],'italic':['\x1B[3m','\x1B[23m'],'underline':['\x1B[4m','\x1B[24m'],'inverse':['\x1B[7m','\x1B[27m'],'strikethrough':['\x1B[9m','\x1B[29m'],
			'white':['\x1B[37m','\x1B[39m'],'grey':['\x1B[90m','\x1B[39m'],'black':['\x1B[30m','\x1B[39m'],'blue':['\x1B[34m','\x1B[39m'],'yellow':['\x1B[33m','\x1B[39m'],
			'cyan':['\x1B[36m','\x1B[39m'],'green':['\x1B[32m','\x1B[39m'],'magenta':['\x1B[35m','\x1B[39m'],'red':['\x1B[31m','\x1B[39m'],
			'whiteBG':['\x1B[47m','\x1B[49m'],'greyBG':['\x1B[49;5;8m','\x1B[49m'],'blackBG':['\x1B[40m','\x1B[49m'],'blueBG':['\x1B[44m','\x1B[49m'],'yellowBG':['\x1B[43m','\x1B[49m'],
			'cyanBG':['\x1B[46m','\x1B[49m'],'greenBG':['\x1B[42m','\x1B[49m'],'magentaBG':['\x1B[45m','\x1B[49m'],'redBG':['\x1B[41m','\x1B[49m']
		},
		con = function( str, style ){return style = conStyle[style] || conStyle['white'], style[0] + str + style[1];},
		module.exports = test;
	}else{
		test.printer = function(f){printer = f;},
		test.result = function(f){result = f;},
		test.suite = function(){
			var i = arguments.length, url;
			test.suite.urls = arguments;
			while( i-- ) url = arguments[i], printer(
				'<div style="width:250px;float:left;border:1px dashed #999;background:#eee;padding:10px;margin:10px">'+
					'<div>'+
						'<a href="'+url+'" target="_blank">'+url+'</a> ' +
						'<span id="'+url+'"><b style="font-size:20px;color:#0a0">OK</b></span>'+
					'</div>'+
					'<iframe src="'+url+'" scrolling="no" style="margin-top:10px;border:0;width:100%;height:200px"></iframe>'+
				'</div>'
			);
			result( '<div style="font-weight:bold;font-size:30px;padding:10px;color:#0a0">OK</div><hr>' );
		},
		test.suiteResult = function(v){result(v);};
	}
	return test;
})();